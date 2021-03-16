import type { ReactElement } from 'react';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useIssueScreenSize } from 'src/screens/issue/use-size';
import { metrics } from 'src/theme/spacing';

const styles = StyleSheet.create({
	outer: {
		paddingLeft: metrics.horizontal,
		paddingRight: metrics.horizontal,
		marginBottom: Platform.OS === 'android' ? 5 : 0,
		marginTop: 0,
		paddingBottom: 2,
	},
});

const FrontWrapper = ({
	children,
	scrubber,
}: {
	scrubber: ReactElement;
	children: ReactElement;
}) => {
	const { card, container } = useIssueScreenSize();
	return (
		<>
			<View style={styles.outer}>{scrubber}</View>
			<View style={{ height: card.height, width: container.width }}>
				{children}
			</View>
		</>
	);
};

export { FrontWrapper };
