import React, { useState } from 'react';
import Svg, { Rect } from 'react-native-svg';
import type { Rectangle as RectangleType } from 'src/common';
import { color } from 'src/theme/color';

/*
to use TextBoxes, first use useTextBoxes on a <Text> element
to get the boxes behind that text, and then pass them to <TextBoxes>

eg:

const Item = () => {
    const [onTextLayout, boxes] = useTextBoxes()
    return (
        <View>
            <Text onTextLayout={onTextLayout}>
                Hello Ive got a box under me
            </HeadlineText>
            <View style={positioned-absolutely}>
                <TextBoxes boxes={boxes} />
            </View>
        </View>
    );
}

*/

type TextBoxes = RectangleType[];
const useTextBoxes = (): [(ev: any) => void, TextBoxes] => {
	const [boxes, setBoxes] = useState<TextBoxes>([]);

	const onTextLayout = (ev: any) => {
		/* make the boxes a bit bigger vertically for aesthetics*/
		setBoxes(
			ev.nativeEvent.lines.map((line: any) => ({
				x: line.x,
				y: line.y + 2,
				height: line.height * 1.1,
				width: line.width,
			})),
		);
	};

	return [onTextLayout, boxes];
};

const TextBoxes = ({ boxes }: { boxes: TextBoxes }) => (
	<Svg width={'100%'} height={400}>
		{boxes.map(({ top, left, width, height }, i) => (
			<Rect
				key={i}
				fill={color.palette.highlight.main}
				x={top}
				y={left}
				width={width}
				height={height}
			></Rect>
		))}
	</Svg>
);

export { useTextBoxes, TextBoxes };
