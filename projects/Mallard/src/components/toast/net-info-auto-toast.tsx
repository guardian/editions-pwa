import { NetInfoStateType } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { useNetInfo } from 'src/hooks/use-net-info';
import { useToast } from 'src/hooks/use-toast';

const NetInfoAutoToast = () => {
	const { showToast } = useToast();
	const { isConnected, type } = useNetInfo();
	useEffect(() => {
		const time = setTimeout(() => {
			if (!isConnected && type !== NetInfoStateType.unknown) {
				showToast('No internet connection');
			}
		}, 1000);
		return () => {
			clearTimeout(time);
		};
	}, [isConnected]);
	return null;
};

export { NetInfoAutoToast };
