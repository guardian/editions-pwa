import React from 'react';
import type { StyleProp } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { color as themeColor } from 'src/theme/color';

const pixel = 1;

const Multiline = ({
	color,
	count,
	style,
	width,
}: {
	color: string;
	count: number;
	style?: StyleProp<{}>;
	width?: string | number;
}) => {
	const gap = count < 4 ? 2 : 3;

	const lines = [];
	for (let i = 0; i < count; i++) {
		lines.push(
			<Rect
				key={i}
				y={pixel * i * gap}
				width="100%"
				height={pixel}
				fill={color}
			/>,
		);
	}
	return (
		<Svg
			{...style}
			width={width}
			height={pixel * count * gap - 1}
			fill="none"
		>
			{lines}
		</Svg>
	);
};
Multiline.defaultProps = {
	color: themeColor.text,
	count: 4,
	width: '100%',
};

export { Multiline };
