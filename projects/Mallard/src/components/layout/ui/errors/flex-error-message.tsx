import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { metrics } from 'src/theme/spacing';
import { FlexCenter } from '../../flex-center';
import type { PropTypes } from './error-message';
import { ErrorMessage } from './error-message';

const styles = StyleSheet.create({
	main: {
		paddingHorizontal: metrics.horizontal,
	},
});

const FlexErrorMessage = ({
	style,
	...props
}: { style?: StyleProp<ViewStyle> } & PropTypes) => (
	<FlexCenter style={[style, styles.main]}>
		<ErrorMessage {...props} />
	</FlexCenter>
);

export { FlexErrorMessage };
