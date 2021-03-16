import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import type { ScaledSize } from 'react-native';
import { useDimensions } from 'src/hooks/use-config-provider';
import type { BreakpointList } from 'src/theme/breakpoints';
import { getClosestBreakpoint } from 'src/theme/breakpoints';

const WithBreakpoints: FunctionComponent<{
	children: BreakpointList<(d: ScaledSize) => ReactNode>;
}> = ({ children }) => {
	const { width, ...dimensions } = useDimensions();
	const maxSize = getClosestBreakpoint(
		(Object.keys(children) as unknown[]) as number[],
		width,
	);
	return <>{children[maxSize]({ width, ...dimensions })}</>;
};

export { WithBreakpoints };
