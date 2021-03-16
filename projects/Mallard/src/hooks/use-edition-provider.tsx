import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import type { Dispatch } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native';
import type {
	EditionsList,
	Locale,
	RegionalEdition,
	SpecialEdition,
	SpecialEditionHeaderStyles,
} from 'src/common';
import { eventEmitter } from 'src/helpers/event-emitter';
import { locale } from 'src/helpers/locale';
import { getSetting } from 'src/helpers/settings';
import {
	defaultSettings,
	editionsEndpoint,
} from 'src/helpers/settings/defaults';
import {
	defaultEditionCache,
	editionsListCache,
	seenEditionsCache,
	selectedEditionCache,
	showAllEditionsCache,
} from 'src/helpers/storage';
import { pushNotificationRegistration } from 'src/notifications/push-notifications';
import { errorService } from 'src/services/errors';
import { defaultRegionalEditions } from '../../../Apps/common/src/editions-defaults';
import { getEditionIds } from '../../../Apps/common/src/helpers';

interface EditionState {
	editionsList: EditionsList;
	selectedEdition: RegionalEdition | SpecialEdition;
	defaultEdition: RegionalEdition;
	showNewEditionCard: boolean;
	setShowNewEditionCard: (isShown: boolean) => void;
	setNewEditionSeen: () => void;
	storeSelectedEdition: (
		chosenEdition: RegionalEdition | SpecialEdition,
	) => void;
}

export const getSpecialEditionProps = (
	edition: RegionalEdition | SpecialEdition,
): { headerStyle?: SpecialEditionHeaderStyles } | undefined => {
	return edition.editionType === 'Special'
		? (edition as SpecialEdition)
		: undefined;
};

export const DEFAULT_EDITIONS_LIST = {
	regionalEditions: defaultRegionalEditions,
	specialEditions: [],
	trainingEditions: [],
};

export const BASE_EDITION = defaultRegionalEditions[0];

const localeToEdition = (
	locale: Locale,
	editionsList: EditionsList,
): RegionalEdition => {
	return (
		editionsList.regionalEditions.find(
			(edition) => edition.locale === locale,
		) || BASE_EDITION
	);
};

const defaultState: EditionState = {
	editionsList: DEFAULT_EDITIONS_LIST,
	selectedEdition: BASE_EDITION, // the current chosen edition
	defaultEdition: BASE_EDITION, // the edition to show on app start
	showNewEditionCard: false,
	setShowNewEditionCard: () => {},
	setNewEditionSeen: () => {},
	storeSelectedEdition: () => {},
};

const EditionContext = createContext(defaultState);

const getSelectedEdition = async () => {
	try {
		const selected = await selectedEditionCache.get();
		const editionsList = await editionsListCache.get();
		const editionIds = editionsList ? getEditionIds(editionsList) : [];

		return selected && editionIds.includes(selected.edition)
			? selected
			: null;
	} catch {
		return null;
	}
};

export const getSelectedEditionSlug = async () => {
	const edition = await getSelectedEdition();
	return edition ? edition.edition : BASE_EDITION.edition;
};

// Exported for testing, only use internally to maintain local and async state
export const getDefaultEdition = async () => {
	try {
		return await defaultEditionCache.get();
	} catch {
		return null;
	}
};

export const getDefaultEditionSlug = async () => {
	const defaultEdition = await getDefaultEdition();
	return defaultEdition ? defaultEdition.edition : null;
};

export const fetchEditions = async (
	apiUrl: string,
): Promise<EditionsList | null> => {
	try {
		const response = await fetch(apiUrl, {
			headers: {
				'Content-Type': 'application/json',
				'cache-control': 'max-age=300',
			},
		});
		if (response.status !== 200) {
			throw new Error(
				`Bad response from Editions URL - status: ${response.status}`,
			);
		}
		const json = await response.json();
		return json;
	} catch (e) {
		e.message = `Unable to fetch ${apiUrl} : ${e.message}`;
		errorService.captureException(e);
		return null;
	}
};

export const removeExpiredSpecialEditions = (
	editionsList: EditionsList,
): EditionsList => {
	return {
		...editionsList,
		specialEditions: editionsList.specialEditions.filter((e) =>
			moment().isBefore(e.expiry),
		),
	};
};

export const getEditions = async (
	apiUrl: string = defaultSettings.editionsUrl,
) => {
	try {
		const { isConnected } = await NetInfo.fetch();
		// We are connected
		if (isConnected) {
			// Grab editions list from the endpoint
			const editionsList = await fetchEditions(apiUrl);
			if (editionsList) {
				const showAllEditions = await showAllEditionsCache.get();
				const filteredList = showAllEditions
					? editionsList
					: removeExpiredSpecialEditions(editionsList);
				// Successful? Store in the cache and return
				await editionsListCache.set(filteredList);
				return filteredList;
			}
			// Unsuccessful, try getting it from our local storage
			const cachedEditionsList = await editionsListCache.get();
			if (cachedEditionsList) {
				return cachedEditionsList;
			}
			// Not in local storage either?
			throw new Error('Unable to Get Editions');
		}
		// Not connected? Try local storage
		const cachedEditionsList = await editionsListCache.get();
		if (cachedEditionsList) {
			return cachedEditionsList;
		}
		// Not in local storage either?
		throw new Error('Unable to Get Editions');
	} catch (e) {
		errorService.captureException(e);
		return DEFAULT_EDITIONS_LIST;
	}
};

const setEdition = async (
	edition: RegionalEdition,
	setDefaultEdition: Dispatch<RegionalEdition>,
	setSelectedEdition: Dispatch<RegionalEdition | SpecialEdition>,
) => {
	setDefaultEdition(edition);
	setSelectedEdition(edition);
	await selectedEditionCache.set(edition);
	await defaultEditionCache.set(edition);
	eventEmitter.emit('editionCachesSet');
	pushNotificationRegistration();
};

export const defaultEditionDecider = async (
	setDefaultEdition: Dispatch<RegionalEdition>,
	setSelectedEdition: Dispatch<RegionalEdition | SpecialEdition>,
	editionsList: EditionsList,
): Promise<void> => {
	const selectedEdition = await getSelectedEdition();
	// When user already has default edition set then that edition
	const defaultEdition = await getDefaultEdition();

	// if user has already selected an edition, use that one
	if (selectedEdition) {
		setSelectedEdition(selectedEdition);
	} else if (defaultEdition) {
		setDefaultEdition(defaultEdition);
		setSelectedEdition(defaultEdition);
		await selectedEditionCache.set(defaultEdition);
		pushNotificationRegistration();
	} else {
		// Get the correct edition for the device locale
		const autoDetectedEdition = localeToEdition(locale, editionsList);

		if (autoDetectedEdition) {
			await setEdition(
				autoDetectedEdition,
				setDefaultEdition,
				setSelectedEdition,
			);
		} else {
			// auto detected edition was not possible, set default edition
			await setEdition(
				BASE_EDITION,
				setDefaultEdition,
				setSelectedEdition,
			);
		}
	}
};

export const EditionProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [editionsList, setEditionsList] = useState<EditionsList>(
		DEFAULT_EDITIONS_LIST,
	);
	const [selectedEdition, setSelectedEdition] = useState<
		RegionalEdition | SpecialEdition
	>(BASE_EDITION);
	const [defaultEdition, setDefaultEdition] = useState<RegionalEdition>(
		BASE_EDITION,
	);
	const [showNewEditionCard, setShowNewEditionCard] = useState(false);
	const [apiUrl, setApiUrl] = useState('');

	/**
	 * Default Edition and Selected
	 *
	 * On clean install the cache will be empty, therefore defaultRegionalEditions[0]
	 * (aka UK Daily) remains as the default until one is set. If found, we want to
	 * also set this as the selected edition
	 */
	useEffect(() => {
		defaultEditionDecider(
			setDefaultEdition,
			setSelectedEdition,
			editionsList,
		);
	}, [editionsList]);

	/**
	 * List of Editions
	 *
	 * We grab the editions from the endpoint. If its not accessible, we use the default
	 * editions that are set in the initial state
	 */
	useEffect(() => {
		// Get the api url and then make network request to fetch edition list
		getSetting('apiUrl').then(async (url) => {
			const fullUrl = editionsEndpoint(url);
			setApiUrl(fullUrl);

			// Avoid calling getEditions below by passing `apiUrl` state variable because that
			// doesn't get updated immediately, it only updates in next render.
			// Details can be found here: https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
			const ed = await getEditions(fullUrl);
			if (ed) {
				setEditionsList(ed);
			}
		});
	}, []);

	/**
	 * If a chosen edition is regional, then we mark that as default for future reference
	 */
	const storeSelectedEdition = async (
		chosenEdition: RegionalEdition | SpecialEdition,
	) => {
		await selectedEditionCache.set(chosenEdition);
		setSelectedEdition(chosenEdition);
		if (chosenEdition.editionType === 'Regional') {
			await defaultEditionCache.set(chosenEdition as RegionalEdition);
			setDefaultEdition(chosenEdition as RegionalEdition);
			pushNotificationRegistration();
		}
		eventEmitter.emit('editionUpdate');
	};

	/**
	 * On App State change to foreground, we want to check for a new editionsList
	 */
	useEffect(() => {
		const appChangeEventHandler = async (appState: AppStateStatus) =>
			appState === 'active' &&
			apiUrl &&
			getEditions(apiUrl).then((ed) => ed && setEditionsList(ed));

		AppState.addEventListener('change', appChangeEventHandler);

		return () => {
			AppState.removeEventListener('change', appChangeEventHandler);
		};
	});

	useEffect(() => {
		seenEditionsCache.get().then((seen) => {
			const unseenEditions = editionsList.specialEditions.filter(
				(e) => !seen || !seen.includes(e.edition),
			);
			if (unseenEditions.length > 0) {
				setShowNewEditionCard(true);
			}
		});
	}, [editionsList.specialEditions]);

	const setNewEditionSeen = () => {
		if (!showNewEditionCard) return;
		seenEditionsCache.set(
			editionsList.specialEditions.map((e) => e.edition),
		);
		setShowNewEditionCard(false);
	};

	return (
		<EditionContext.Provider
			value={{
				editionsList,
				selectedEdition,
				defaultEdition,
				showNewEditionCard,
				storeSelectedEdition,
				setShowNewEditionCard,
				setNewEditionSeen,
			}}
		>
			{children}
		</EditionContext.Provider>
	);
};

export const useEditions = () => useContext(EditionContext);
