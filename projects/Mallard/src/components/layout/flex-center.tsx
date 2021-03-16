import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

/*
Super simple centerer helper to put
things in the middle of the screen
*/

const styles = StyleSheet.create({
	root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const FlexCenter = ({
	children,
	style,
}: {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
}) => <View style={[styles.root, style]}>{children}</View>;

export { FlexCenter };
