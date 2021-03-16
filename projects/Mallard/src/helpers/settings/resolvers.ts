/**
 * This exposes Apollo resolvers for all setting as well as query helpers for
 * some of the GDPR settings.
 */
import type { GDPRBucketKeys } from 'src/helpers/settings';
import { GdprBuckets, getSetting } from 'src/helpers/settings';

/**
 * We have setting keys **both** for GDPR consent "buckets" and specific
 * consent keys. This is why we merge them all flat in this array.
 */
export const ALL_GDPR_SETTING_NAMES = Object.keys(GdprBuckets).reduce<string[]>(
	(names, bucketName) => {
		return names.concat(
			[bucketName],
			GdprBuckets[bucketName as GDPRBucketKeys] as any,
		);
	},
	[],
);

/**
 * Build a piece of GraphQL query string that would fetch all the settings with
 * the provided names. Ex. `foo @client, bar @client` to fetch `foo` and `bar`.
 */
const makeFragment = (names: string[]) =>
	names.map((name) => `${name} @client,`).join('');

/**
 * Put this in a query in order to fetch all the GDPR settings.
 */
export const GDPR_SETTINGS_FRAGMENT = makeFragment(ALL_GDPR_SETTING_NAMES);

const ALL_NAMES = [
	...ALL_GDPR_SETTING_NAMES,
	'apiUrl',
	'isWeatherShown',
	'isUsingProdDevtools',
	'wifiOnlyDownloads',
	'maxAvailableEditions',
];

/**
 * Insert this in a query to fetch all setting. In practice, only useful for the
 * Dev menu.
 */
export const ALL_SETTINGS_FRAGMENT = makeFragment(ALL_NAMES);

export const SettingValues: Map<string, Promise<unknown>> = new Map();

/**
 * Build up a separate Apollo resolver function for each of all the known
 * settings.
 */
const SETTINGS_RESOLVERS: Record<string, any> = {};
for (const name of ALL_NAMES) {
	SETTINGS_RESOLVERS[name] = () => {
		if (!SettingValues.has(name)) {
			SettingValues.set(name, getSetting(name as any));
		}
		return SettingValues.get(name);
	};
}

export { SETTINGS_RESOLVERS };
