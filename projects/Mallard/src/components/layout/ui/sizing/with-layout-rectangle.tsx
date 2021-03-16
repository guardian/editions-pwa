import type { FunctionComponent, ReactNode } from 'react';
import React, { useState } from 'react';
import type { LayoutRectangle } from 'react-native';
import { View } from 'react-native';

const WithLayoutRectangle: FunctionComponent<{
	children: (l: LayoutRectangle) => ReactNode;
	minHeight?: number;
	fallback?: ReactNode;
}> = ({ children, minHeight, fallback }) => {
	const [metrics, setMetrics] = useState<LayoutRectangle | null>(null);
	return (
		<View
			style={{ minHeight, flexGrow: 1 }}
			onLayout={(ev) => {
				setMetrics(ev.nativeEvent.layout);
			}}
		>
			{!metrics && fallback}
			{metrics && children(metrics)}
		</View>
	);
};

export { WithLayoutRectangle };
