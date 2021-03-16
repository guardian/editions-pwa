import { NativeModules, Platform } from 'react-native';

const locale =
	Platform.OS === 'ios'
		? NativeModules.SettingsManager.settings.AppleLocale ||
		  NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
		: NativeModules.I18nManager.localeIdentifier;

const languageLocale = locale.replace('_', '-');

export { locale, languageLocale };
