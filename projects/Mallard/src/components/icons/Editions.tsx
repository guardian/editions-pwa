import React from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';

const Editions = ({
	height = 42,
	width = 42,
}: {
	height?: number;
	width?: number;
}) => (
	<Svg width={width} height={height} fill="none">
		<Rect x="0.5" y="0.5" width="41" height="41" rx="20.5" stroke="white" />
		<Circle cx="29" cy="14" r="7" fill="#FFBAC8" />
		<Circle cx="14" cy="14" r="7" fill="white" />
		<Circle cx="29" cy="29" r="7" fill="#90DCFF" />
		<Circle cx="14" cy="29" r="7" fill="#FF7F0F" />
	</Svg>
);

export { Editions };
