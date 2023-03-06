import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import PaginationBar from './PaginationBar';

export default {
	title: 'Components/PaginationBar',
	component: PaginationBar,
} as ComponentMeta<typeof PaginationBar>;

const Template: ComponentStory<typeof PaginationBar> = (args) => <PaginationBar {...args} />;

export const Default = Template.bind({});
Default.args = {
	onPageChange: () => action('pagechange')(),
	start: 0,
	count: 20,
	total: 25,
	showBackToTop: true,
	nextLabel: 'Volgende',
	nextIcon: <p>nexticon</p>,
	previousLabel: 'Vorige',
	previousIcon: <p>previousIcon</p>,
	backToTopLabel: 'Terug naar boven',
	backToTopIcon: <p>backtotopicon</p>,
};
