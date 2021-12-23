import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';

import { ColorCategory, COLORS } from '../../colors';

import { SwatchBlock } from './SwatchBlock';

const transformColors = (colors: ColorCategory) => {
	return Object.entries(colors).map(([name, value]) => ({
		name,
		value,
	}));
};

const stories = [
	['Grayscale', transformColors(COLORS.GRAYSCALE)],
	['Primary', transformColors(COLORS.PRIMARY)],
	['Secondary', transformColors(COLORS.SECONDARY)],
	['Tertiary', transformColors(COLORS.TERTIARY)],
];

const story = storiesOf('v1/components/Colors', module);

stories.forEach(([title, colors]: any) => story.add(title, () => <SwatchBlock colors={colors} />));

story.add('All colors', () => (
	<Fragment>
		{stories.map(([title, colors]: any, i) => (
			<SwatchBlock key={`swatch-${i}`} title={title} colors={colors} />
		))}
	</Fragment>
));
