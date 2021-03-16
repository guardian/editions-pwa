import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAccess, useIdentity } from 'src/authentication/AccessContext';
import { useModal } from '../modal';
import { SignInModalCard } from '../sign-in-modal-card';
import { SubNotFoundModalCard } from '../sub-not-found-modal-card';

const overlayStyles = StyleSheet.create({
	wrapper: {
		overflow: 'hidden',
		flex: 1,
	},
});

/**
 * This turns a prop into a ref, which means closures that run
 * asynchronously can get a reference to the most recent version
 * of the prop rather than the value at the time it was closed
 * over
 */
const usePropToRef = <T extends any>(value: T) => {
	const ref = useRef(value);
	useEffect(() => {
		ref.current = value;
	});
	return ref;
};

/**
 * This allows us to open a modal using a component in the view.
 *
 * The primary use case here is for opening with a scrolling interaction.
 */

/**
 * Because there are various ways to get back to this component without logging in
 * or it unmounting we need to keep checking whether the user has actually logged in
 * when they're on this page.
 *
 * In order to do this, it sets up an interval which will check whether we need to show
 * the login modal based on whether the component is focused and whether a modal is
 * already open.
 *
 * It might be slighlty nicer to do this after some user event like a touch. However,
 * because we're using transparent cards, this component doesn't actually receive
 * certain gesture events on Android. This could be fixed in future but for the time being
 * this seems ok for release.
 */

const ModalOpener = ({
	children,
	isFocused,
	renderModal,
}: {
	children: React.ReactNode;
	isFocused: () => boolean;
	renderModal: (close: () => void) => React.ReactNode;
}) => {
	const { open, close, isOpen } = useModal();
	const isOpenRef = usePropToRef(isOpen);
	const renderModalRef = usePropToRef(renderModal);

	useEffect(() => {
		const id = setInterval(() => {
			if (!isOpenRef.current && isFocused()) {
				open(renderModalRef.current);
			}
		}, 3000);
		return () => clearTimeout(id);
	}, [isFocused, isOpenRef, open, renderModalRef]);

	// ensure the modal is closed on unmount
	useEffect(() => () => close(), [close]);

	return <View style={overlayStyles.wrapper}>{children}</View>;
};

const LoginOverlay = ({
	children,
	isFocused,
	onDismiss,
	onOpenCASLogin,
	onLoginPress,
}: {
	children: React.ReactNode;
	isFocused: () => boolean;
	onDismiss: () => void;
	onOpenCASLogin: () => void;
	onLoginPress: () => void;
}) => {
	const canAccess = useAccess();
	const idData = useIdentity();
	return canAccess ? (
		<>{children}</>
	) : idData ? (
		<ModalOpener
			isFocused={isFocused}
			renderModal={(close) => (
				<SubNotFoundModalCard
					onDismiss={onDismiss}
					onOpenCASLogin={onOpenCASLogin}
					onLoginPress={onLoginPress}
					close={close}
				/>
			)}
		>
			{children}
		</ModalOpener>
	) : (
		<ModalOpener
			isFocused={isFocused}
			renderModal={(close) => (
				<SignInModalCard
					onDismiss={onDismiss}
					onLoginPress={onLoginPress}
					close={close}
				/>
			)}
		>
			{children}
		</ModalOpener>
	);
};

export { LoginOverlay };
