import { createContext, useContext } from 'react';
import { color } from './color';

/*
Types
*/
export interface AppAppearanceStyles {
	backgroundColor: string;
	cardBackgroundColor: string;
	borderColor: string;
	color: string;
	dimColor: string;
}

export type AppAppearance = 'default' | 'primary' | 'tertiary' | 'settings';

export const appAppearances: { [key in AppAppearance]: AppAppearanceStyles } = {
	primary: {
		backgroundColor: color.primaryDarker,
		cardBackgroundColor: color.primaryDarker,
		borderColor: color.lineOverPrimary,
		color: color.textOverPrimary,
		dimColor: color.textOverPrimary,
	},
	default: {
		backgroundColor: color.dimBackground,
		cardBackgroundColor: color.background,
		borderColor: color.line,
		color: color.text,
		dimColor: color.dimText,
	},
	tertiary: {
		backgroundColor: color.dimBackground,
		cardBackgroundColor: color.dimBackground,
		borderColor: '#052962',
		color: '#052962',
		dimColor: '#052962',
	},
	settings: {
		backgroundColor: color.background,
		cardBackgroundColor: color.background,
		borderColor: color.line,
		color: color.palette.brand.dark,
		dimColor: color.text,
	},
};

/*
  Exports
 */
const AppAppearanceContext = createContext<AppAppearance>('default');

export const WithAppAppearance = AppAppearanceContext.Provider;
export const useAppAppearance = (): AppAppearanceStyles =>
	appAppearances[useContext(AppAppearanceContext)];
