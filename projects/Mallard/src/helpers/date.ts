import moment from 'moment-timezone';
import { Platform } from 'react-native';
import { languageLocale } from './locale';

const londonTime = (time?: string | number) => {
	if (time != null) return moment.tz(time, 'Europe/London');
	return moment.tz('Europe/London');
};

const localDate = (date: Date): string => {
	if (Platform.OS === 'ios') {
		return date.toLocaleDateString(languageLocale);
	} else {
		// toLocaleDateString is not a reliable way of getting the format we need on android
		return languageLocale === 'en-US'
			? moment(date).format('MM/DD/YYYY')
			: moment(date).format('DD/MM/YYYY');
	}
};

export { londonTime, localDate };
