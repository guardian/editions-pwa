import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 0,
	},
	baseWeatherIcon: {
		fontFamily: 'GuardianWeatherIcons-Regular',
		position: 'absolute',
	},
});

const iconColours: Record<string, string> = {
	'\ue900': '#febb12',
	'\ue901': 'rgb(255, 187, 0)',
	'\ue902': 'rgb(189, 189, 189)',
	'\ue903': 'rgb(255, 187, 0)',
	'\ue904': 'rgb(189, 189, 189)',
	'\ue905': 'rgb(255, 187, 0)',
	'\ue906': 'rgb(189, 189, 189)',
	'\ue907': 'rgb(255, 187, 0)',
	'\ue908': 'rgb(189, 189, 189)',
	'\ue909': '#bdbdbd',
	'\ue90a': '#bdbdbd',
	'\ue90b': '#767676',
	'\ue90c': '#bdbdbd',
	'\ue90d': 'rgb(118, 118, 118)',
	'\ue90e': 'rgb(75, 198, 223)',
	'\ue90f': 'rgb(75, 198, 223)',
	'\ue910': 'rgb(75, 198, 223)',
	'\ue911': 'rgb(75, 198, 223)',
	'\ue912': 'rgb(118, 118, 118)',
	'\ue913': 'rgb(118, 118, 118)',
	'\ue914': 'rgb(75, 198, 223)',
	'\ue915': 'rgb(75, 198, 223)',
	'\ue916': 'rgb(75, 198, 223)',
	'\ue917': 'rgb(75, 198, 223)',
	'\ue918': 'rgb(118, 118, 118)',
	'\ue919': 'rgb(255, 187, 0)',
	'\ue91a': 'rgb(118, 118, 118)',
	'\ue91b': 'rgb(75, 198, 223)',
	'\ue91c': 'rgb(75, 198, 223)',
	'\ue91d': 'rgb(75, 198, 223)',
	'\ue91e': 'rgb(75, 198, 223)',
	'\ue91f': 'rgb(118, 118, 118)',
	'\ue920': 'rgb(255, 187, 0)',
	'\ue921': 'rgb(51, 51, 51)',
	'\ue922': 'rgb(255, 187, 0)',
	'\ue923': 'rgb(51, 51, 51)',
	'\ue924': 'rgb(51, 51, 51)',
	'\ue925': 'rgb(255, 187, 0)',
	'\ue926': 'rgb(255, 187, 0)',
	'\ue927': 'rgb(51, 51, 51)',
	'\ue928': 'rgb(75, 198, 223)',
	'\ue929': 'rgb(118, 118, 118)',
	'\ue92a': 'rgb(118, 118, 118)',
	'\ue92b': 'rgb(75, 198, 223)',
	'\ue92c': 'rgb(75, 198, 223)',
	'\ue92d': 'rgb(118, 118, 118)',
	'\ue92e': 'rgb(189, 189, 189)',
	'\ue92f': 'rgb(118, 118, 118)',
	'\ue930': 'rgb(75, 198, 223)',
	'\ue931': 'rgb(75, 198, 223)',
	'\ue932': 'rgb(118, 118, 118)',
	'\ue933': 'rgb(189, 189, 189)',
	'\ue934': 'rgb(255, 187, 0)',
	'\ue935': 'rgb(118, 118, 118)',
	'\ue936': 'rgb(75, 198, 223)',
	'\ue937': 'rgb(75, 198, 223)',
	'\ue938': 'rgb(118, 118, 118)',
	'\ue939': 'rgb(189, 189, 189)',
	'\ue93a': 'rgb(118, 118, 118)',
	'\ue93b': 'rgb(189, 189, 189)',
	'\ue93c': 'rgb(118, 118, 118)',
	'\ue93d': 'rgb(118, 118, 118)',
	'\ue93e': 'rgb(189, 189, 189)',
	'\ue93f': 'rgb(255, 187, 0)',
	'\ue940': 'rgb(118, 118, 118)',
	'\ue941': '#bdbdbd',
	'\ue942': 'rgb(189, 189, 189)',
	'\ue943': 'rgb(118, 118, 118)',
	'\ue944': 'rgb(75, 198, 223)',
	'\ue945': 'rgb(75, 198, 223)',
	'\ue946': 'rgb(189, 189, 189)',
	'\ue947': 'rgb(118, 118, 118)',
	'\ue948': 'rgb(189, 189, 189)',
	'\ue949': 'rgb(118, 118, 118)',
	'\ue94a': 'rgb(75, 198, 223)',
	'\ue94b': 'rgb(75, 198, 223)',
	'\ue94c': 'rgb(189, 189, 189)',
	'\ue94d': 'rgb(118, 118, 118)',
	'\ue94e': 'rgb(118, 118, 118)',
	'\ue94f': 'rgb(75, 198, 223)',
	'\ue950': 'rgb(75, 198, 223)',
	'\ue951': 'rgb(118, 118, 118)',
	'\ue952': 'rgb(189, 189, 189)',
	'\ue953': 'rgb(221, 221, 221)',
	'\ue954': 'rgb(234, 105, 17)',
	'\ue955': 'rgb(75, 198, 223)',
	'\ue956': 'rgb(221, 221, 221)',
	'\ue957': 'rgb(75, 198, 223)',
	'\ue958': '#bdbdbd',
	'\ue959': '#bfb59f',
	'\ue95a': 'rgb(191, 181, 159)',
	'\ue95b': 'rgb(221, 221, 221)',
	'\ue95c': 'rgb(191, 181, 159)',
	'\ue95d': 'rgb(189, 189, 189)',
	'\ue95e': 'rgb(191, 181, 159)',
	'\ue95f': 'rgb(189, 189, 189)',
	'\ue960': 'rgb(191, 181, 159)',
	'\ue961': 'rgb(189, 189, 189)',
	'\ue962': 'rgb(191, 181, 159)',
	'\ue963': 'rgb(189, 189, 189)',
	'\ue964': 'rgb(191, 181, 159)',
	'\ue965': 'rgb(75, 198, 223)',
	'\ue966': 'rgb(75, 198, 223)',
	'\ue967': 'rgb(75, 198, 223)',
	'\ue968': 'rgb(75, 198, 223)',
	'\ue969': 'rgb(118, 118, 118)',
	'\ue96a': 'rgb(191, 181, 159)',
	'\ue96b': 'rgb(75, 198, 223)',
	'\ue96c': 'rgb(75, 198, 223)',
	'\ue96d': 'rgb(75, 198, 223)',
	'\ue96e': 'rgb(75, 198, 223)',
	'\ue96f': 'rgb(118, 118, 118)',
	'\ue970': 'rgb(191, 181, 159)',
	'\ue971': 'rgb(255, 187, 0)',
	'\ue972': 'rgb(51, 51, 51)',
	'\ue973': 'rgb(191, 181, 159)',
	'\ue974': 'rgb(255, 187, 0)',
	'\ue975': 'rgb(51, 51, 51)',
	'\ue976': 'rgb(75, 198, 223)',
	'\ue977': 'rgb(75, 198, 223)',
	'\ue978': 'rgb(118, 118, 118)',
	'\ue979': 'rgb(189, 189, 189)',
	'\ue97a': 'rgb(191, 181, 159)',
	'\ue97b': 'rgb(189, 189, 189)',
	'\ue97c': 'rgb(118, 118, 118)',
	'\ue97d': 'rgb(191, 181, 159)',
};

export const WeatherIcon = ({
	iconNumber,
	fontSize,
}: {
	iconNumber: number;
	fontSize: number;
}) => {
	switch (iconNumber) {
		case 1:
			return <WeatherIcon1 fontSize={fontSize} />;
		case 2:
			return <WeatherIcon2 fontSize={fontSize} />;
		case 3:
			return <WeatherIcon3 fontSize={fontSize} />;
		case 4:
			return <WeatherIcon4 fontSize={fontSize} />;
		case 5:
			return <WeatherIcon5 fontSize={fontSize} />;
		case 6:
			return <WeatherIcon6 fontSize={fontSize} />;
		case 7:
			return <WeatherIcon7 fontSize={fontSize} />;
		case 8:
			return <WeatherIcon8 fontSize={fontSize} />;
		case 11:
			return <WeatherIcon11 fontSize={fontSize} />;
		case 12:
			return <WeatherIcon12 fontSize={fontSize} />;
		case 13:
			return <WeatherIcon13 fontSize={fontSize} />;
		case 14:
			return <WeatherIcon14 fontSize={fontSize} />;
		case 15:
			return <WeatherIcon15 fontSize={fontSize} />;
		case 16:
			return <WeatherIcon16 fontSize={fontSize} />;
		case 17:
			return <WeatherIcon17 fontSize={fontSize} />;
		case 18:
			return <WeatherIcon18 fontSize={fontSize} />;
		case 19:
			return <WeatherIcon19 fontSize={fontSize} />;
		case 20:
			return <WeatherIcon20 fontSize={fontSize} />;
		case 21:
			return <WeatherIcon21 fontSize={fontSize} />;
		case 22:
			return <WeatherIcon22 fontSize={fontSize} />;
		case 23:
			return <WeatherIcon23 fontSize={fontSize} />;
		case 24:
			return <WeatherIcon24 fontSize={fontSize} />;
		case 25:
			return <WeatherIcon25 fontSize={fontSize} />;
		case 26:
			return <WeatherIcon26 fontSize={fontSize} />;
		case 29:
			return <WeatherIcon29 fontSize={fontSize} />;
		case 30:
			return <WeatherIcon30 fontSize={fontSize} />;
		case 31:
			return <WeatherIcon31 fontSize={fontSize} />;
		case 32:
			return <WeatherIcon32 fontSize={fontSize} />;
		case 33:
			return <WeatherIcon33 fontSize={fontSize} />;
		case 34:
			return <WeatherIcon34 fontSize={fontSize} />;
		case 35:
			return <WeatherIcon35 fontSize={fontSize} />;
		case 36:
			return <WeatherIcon36 fontSize={fontSize} />;
		case 37:
			return <WeatherIcon37 fontSize={fontSize} />;
		case 38:
			return <WeatherIcon38 fontSize={fontSize} />;
		case 39:
			return <WeatherIcon39 fontSize={fontSize} />;
		case 40:
			return <WeatherIcon40 fontSize={fontSize} />;
		case 41:
			return <WeatherIcon41 fontSize={fontSize} />;
		case 42:
			return <WeatherIcon42 fontSize={fontSize} />;
		case 43:
			return <WeatherIcon43 fontSize={fontSize} />;
		case 44:
			return <WeatherIcon44 fontSize={fontSize} />;
		default:
			return null;
	}
};

const renderIcon = (iconCodes: string[], fontSize: number) => {
	return (
		<View
			style={{ ...styles.container, height: fontSize, width: fontSize }}
		>
			{iconCodes.map((code) => {
				return (
					<Text
						allowFontScaling={false}
						key={code}
						style={{
							...styles.baseWeatherIcon,
							color: iconColours[code],
							fontSize: fontSize,
						}}
					>
						{code}
					</Text>
				);
			})}
		</View>
	);
};

const WeatherIcon1 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue900'], fontSize);
};

const WeatherIcon2 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue901', '\ue902'], fontSize);
};

const WeatherIcon3 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue903', '\ue904'], fontSize);
};

const WeatherIcon4 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue905', '\ue906'], fontSize);
};

const WeatherIcon5 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue907', '\ue908'], fontSize);
};

const WeatherIcon6 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue909'], fontSize);
};

const WeatherIcon7 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue90a'], fontSize);
};

const WeatherIcon8 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue90b'], fontSize);
};

const WeatherIcon11 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue90c'], fontSize);
};

const WeatherIcon12 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue90d', '\ue90e', '\ue90f', '\ue910', '\ue911', '\ue912'],
		fontSize,
	);
};

const WeatherIcon13 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue913', '\ue914', '\ue915', '\ue916', '\ue917', '\ue918'],
		fontSize,
	);
};

const WeatherIcon14 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue919', '\ue91a', '\ue91b', '\ue91c', '\ue91d', '\ue91e', '\ue91f'],
		fontSize,
	);
};

const WeatherIcon15 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue920', '\ue921'], fontSize);
};

const WeatherIcon16 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue922', '\ue923'], fontSize);
};

const WeatherIcon17 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue924', '\ue925', '\ue926', '\ue927'], fontSize);
};

const WeatherIcon18 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue928', '\ue929'], fontSize);
};

const WeatherIcon19 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue92a', '\ue92b', '\ue92c', '\ue92d', '\ue92e'],
		fontSize,
	);
};

const WeatherIcon20 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue92f', '\ue930', '\ue931', '\ue932', '\ue933'],
		fontSize,
	);
};

const WeatherIcon21 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue934', '\ue935', '\ue936', '\ue937', '\ue938', '\ue939'],
		fontSize,
	);
};

const WeatherIcon22 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue93a', '\ue93b', '\ue93c'], fontSize);
};

const WeatherIcon23 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue93d', '\ue93e', '\ue93f', '\ue940'], fontSize);
};

const WeatherIcon24 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue941'], fontSize);
};

const WeatherIcon25 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue942', '\ue943', '\ue944', '\ue945', '\ue946', '\ue947'],
		fontSize,
	);
};

const WeatherIcon26 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue948', '\ue949', '\ue94a', '\ue94b', '\ue94c', '\ue94d'],
		fontSize,
	);
};

const WeatherIcon29 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue94e', '\ue94f', '\ue950', '\ue951', '\ue952'],
		fontSize,
	);
};

const WeatherIcon30 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue953', '\ue954'], fontSize);
};

const WeatherIcon31 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue955', '\ue956', '\ue957'], fontSize);
};

const WeatherIcon32 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue958'], fontSize);
};

const WeatherIcon33 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue959'], fontSize);
};

const WeatherIcon34 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue95a', '\ue95b'], fontSize);
};

const WeatherIcon35 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue95c', '\ue95d'], fontSize);
};

const WeatherIcon36 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue95e', '\ue95f'], fontSize);
};

const WeatherIcon37 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue960', '\ue961'], fontSize);
};

const WeatherIcon38 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue962', '\ue963'], fontSize);
};

const WeatherIcon39 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue964', '\ue965', '\ue966', '\ue967', '\ue968', '\ue969'],
		fontSize,
	);
};

const WeatherIcon40 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue96a', '\ue96b', '\ue96c', '\ue96d', '\ue96e', '\ue96f'],
		fontSize,
	);
};

const WeatherIcon41 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue970', '\ue971', '\ue972'], fontSize);
};

const WeatherIcon42 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue973', '\ue974', '\ue975'], fontSize);
};

const WeatherIcon43 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(
		['\ue976', '\ue977', '\ue978', '\ue979', '\ue97a'],
		fontSize,
	);
};

const WeatherIcon44 = ({ fontSize }: { fontSize: number }) => {
	return renderIcon(['\ue97b', '\ue97c', '\ue97d'], fontSize);
};
