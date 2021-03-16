import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'src/components/Button/Button';
import { color } from 'src/theme/color';

const styles = StyleSheet.create({
	container: {
		height: 100,
		backgroundColor: color.primary,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: 20,
	},
});

const PreviewControls = ({
	goPrevious,
	goNext,
}: {
	goPrevious: () => void;
	goNext: () => void;
}) => (
	<View style={styles.container}>
		<Button onPress={goPrevious}>&larr;</Button>
		<Button onPress={goNext}>&rarr;</Button>
	</View>
);

export { PreviewControls };
