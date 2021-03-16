import type { DependencyList, MutableRefObject } from 'react';
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from 'react';

interface Position {
	frontId: string; // Y coordinate
	articleIndex: number; // X coordinate
}

type Subscriber = ((p: Position | null) => void) | undefined;
type SubscriberRef = MutableRefObject<Subscriber> | undefined;
const NavPositionContext = createContext<SubscriberRef>(undefined);

type Props = { children: React.ReactNode };
export const NavPositionProvider = ({ children }: Props) => (
	<NavPositionContext.Provider value={useRef<Subscriber>(undefined)}>
		{children}
	</NavPositionContext.Provider>
);

/**
 * Return a function to set the current position of the view
 * showing the current issue. `state` is a ref so never changes, so this will
 * never cause a re-render. A position of `null` means we should scroll to the
 * very top (ex. where the weather is shown).
 */
export const useSetNavPosition = () => {
	const state = useContext(NavPositionContext);
	return useCallback(
		(newPosition: Position | null) => {
			if (state === undefined) return;
			if (state.current !== undefined) state.current(newPosition);
		},
		[state],
	);
};

/**
 * Subscribe to a requested change of position of the view showing the
 * current issue. `deps` is anything the handler depends on,
 * just as with `useEffect`.
 */
export const useNavPositionChange = (
	handler: (p: Position | null) => void,
	deps: DependencyList = [],
) => {
	const state = useContext(NavPositionContext);
	useEffect(() => {
		if (state === undefined) return () => {};
		if (state.current != null)
			throw new Error('cannot subscribe to nav position change twice');
		state.current = handler;
		return () => (state.current = undefined);
	}, [state, ...deps]);
};
