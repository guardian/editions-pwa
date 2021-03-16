import gql from 'graphql-tag';
import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useQuery } from 'src/hooks/apollo';
import type { NetInfo } from 'src/hooks/use-net-info';

const DevButton = (() => {
	const devToggleStyles = StyleSheet.create({
		bg: {
			backgroundColor: 'black',
			padding: 8,
			borderRadius: 999,
			position: 'absolute',
			bottom: 20,
			left: 20,
			zIndex: 999999999,
		},
		text: {
			color: 'white',
		},
	});

	type QueryValue = {
		netInfo: Pick<
			NetInfo,
			| 'isForcedOffline'
			| 'type'
			| 'setIsForcedOffline'
			| 'isDevButtonShown'
		>;
	};
	const QUERY = gql`
		{
			netInfo @client {
				type @client
				isForcedOffline @client
				setIsForcedOffline @client
				isDevButtonShown @client
			}
		}
	`;

	return () => {
		const res = useQuery<QueryValue>(QUERY);
		if (res.loading) return null;

		const {
			netInfo: {
				type,
				isForcedOffline,
				setIsForcedOffline,
				isDevButtonShown,
			},
		} = res.data;

		if (!isDevButtonShown) return null;

		return (
			<View style={devToggleStyles.bg}>
				<TouchableWithoutFeedback
					onPress={() => setIsForcedOffline(!isForcedOffline)}
				>
					<Text style={devToggleStyles.text}>
						Net info{': '}
						{isForcedOffline ? 'forced offline' : type}
					</Text>
				</TouchableWithoutFeedback>
			</View>
		);
	};
})();

/**
 * Display an overlay on top of the App that allows simulating being
 * off-network. Similar to "aeroplane mode", but just for the app and without
 * preventing React Native reloads. (also there is no aeroplane mode in iOS
 * emulator so this is quite convenient).
 */
export const NetInfoDevOverlay = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<>
			{children}
			<DevButton />
		</>
	);
};
