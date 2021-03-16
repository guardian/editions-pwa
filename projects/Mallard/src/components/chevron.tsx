import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { color as themeColor } from 'src/theme/color';
import { metrics } from 'src/theme/spacing';

const Chevron = ({ color }: { color: string }) => (
	<Svg
		width="37"
		height={metrics.headerHeight / 4}
		viewBox="0 0 37 11"
		fill="none"
	>
		<G opacity="0.5">
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M2.13851 5.03797C0.818469 4.53125 0.159137 3.05037 0.665855 1.73032C1.17257 0.410277 2.65346 -0.249054 3.9735 0.257665L18.2498 5.73784L32.5262 0.257665C33.8462 -0.249054 35.3271 0.410277 35.8338 1.73032C36.3405 3.05037 35.6812 4.53125 34.3612 5.03797L19.5012 10.7422C19.0883 10.9007 18.6595 10.9451 18.2498 10.8908C17.8401 10.9451 17.4114 10.9007 16.9985 10.7422L2.13851 5.03797Z"
				fill={color}
			/>
		</G>
	</Svg>
);
Chevron.defaultProps = {
	color: themeColor.text,
};

export { Chevron };
