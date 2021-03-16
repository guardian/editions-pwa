import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Animated, StyleSheet } from 'react-native';
import { safeInterpolation } from 'src/helpers/math';
import { useAlphaIn } from 'src/hooks/use-alpha-in';

type ModalRenderer = (close: () => void) => React.ReactNode;

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: 'black',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		elevation: 9999,
		zIndex: 9999,
	},
	modalWrapper: {
		alignItems: 'center',
		padding: 10,
		position: 'absolute',
		justifyContent: 'center',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		flex: 1,
		flexDirection: 'column',
		elevation: 9999,
		zIndex: 9999,
	},
});

interface ModalContextValue {
	open: (render: ModalRenderer) => void;
	close: () => void;
	isOpen: boolean;
	render: ModalRenderer | null;
}

const ModalContext = React.createContext<ModalContextValue>({
	open: () => {},
	close: () => {},
	isOpen: false,
	render: null,
});

const useModal = () => useContext(ModalContext);

const Modal = ({ children }: { children: React.ReactNode }) => {
	const [render, setState] = useState<ModalRenderer | null>(null);
	const close = useMemo(() => () => setState(null), []);
	const open = useCallback((renderModal) => setState(() => renderModal), []);
	const value = useMemo(
		(): ModalContextValue => ({
			open,
			close,
			isOpen: !!render,
			render,
		}),
		[open, close, render],
	);
	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

const ModalRenderer = () => {
	const { close, render } = useModal();
	const [show, setShow] = useState(() => render);
	const isTransitioning = useRef(false);
	const val = useAlphaIn(200, { out: true, currentValue: render ? 0.75 : 0 });

	useEffect(() => {
		if (show && !render && !isTransitioning.current) {
			isTransitioning.current = true;
			setTimeout(() => {
				isTransitioning.current = false;
				setShow(null);
			}, 200);
		} else if (!show && render) {
			setShow(() => render);
		}
	}, [render, show]);

	return (
		show && (
			<>
				<Animated.View
					style={[
						styles.overlay,
						{
							opacity: val,
						},
					]}
				/>
				<Animated.View
					style={[
						styles.modalWrapper,
						{
							transform: [
								{
									translateY: val.interpolate({
										inputRange: safeInterpolation([0, 1]),
										outputRange: safeInterpolation([20, 0]),
									}),
								},
							],
						},
					]}
				>
					{show(close)}
				</Animated.View>
			</>
		)
	);
};

export { Modal, ModalRenderer, useModal };
