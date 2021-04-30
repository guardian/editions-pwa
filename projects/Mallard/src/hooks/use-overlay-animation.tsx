import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';

const useOverlayAnimation = (shouldAnimate: boolean) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const [showOverlay, setShowOverlay] = useState(false);

	React.useEffect(() => {
		if (shouldAnimate) {
			setShowOverlay(true);
			Animated.timing(fadeAnim, {
				toValue: 0.5,
				duration: 300,
				delay: 200,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start(() => setShowOverlay(false));
		}
	}, [shouldAnimate]);

	return { showOverlay, fadeAnim };
};

export default useOverlayAnimation;
