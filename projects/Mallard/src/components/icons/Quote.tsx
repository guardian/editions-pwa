import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { color } from 'src/theme/color';

const width = 37;
const height = 21;

const Quote = ({ fill = color.text, scale = 1 }) => (
	<Svg
		style={{
			transform: [
				{ scale },
				{ translateY: (height - height * scale) / 2 },
				{ translateX: (width - width * scale) / -2 },
			],
		}}
		width={width}
		height={height}
		fill="none"
	>
		<Path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M7.96664 0.75H15.1666C14.3 7.18748 13.5333 13.5 13.2 20.5624H0C1.2 13.6875 3.69999 7.18748 7.96664 0.75ZM24.7332 0.75H31.8332C31.0665 7.18748 30.1999 13.5 29.8665 20.5624H16.6999C18.0666 13.6875 20.4666 7.18748 24.7332 0.75Z"
			fill={fill}
		/>
	</Svg>
);

export { Quote };
