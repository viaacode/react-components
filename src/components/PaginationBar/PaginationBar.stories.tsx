import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import PaginationBar from './PaginationBar';
import { PaginationBarProps } from './PaginationBar.types';

export default {
	title: 'Components/PaginationBar',
	component: PaginationBar,
} as ComponentMeta<typeof PaginationBar>;

const Template: ComponentStory<typeof PaginationBar> = (args) => {
	const [startItem, setStartItem] = useState(args.startItem);

	const handlePageChange = (newPage: number) => {
		setStartItem(newPage * args.itemsPerPage);
		action('pagechange')(newPage);
	};

	return <PaginationBar {...args} startItem={startItem} onPageChange={handlePageChange} />;
};

const DEFAULT_PROPS: Partial<PaginationBarProps> = {
	startItem: 0,
	itemsPerPage: 20,
	totalItems: 3000,
	showBackToTop: true,
	nextLabel: 'Volgende',
	nextIcon: <p>nexticon</p>,
	previousLabel: 'Vorige',
	previousIcon: <p>previousIcon</p>,
	backToTopLabel: 'Terug naar boven',
	backToTopIcon: <p>backtotopicon</p>,
};

export const Default = Template.bind({});
Default.args = {
	...DEFAULT_PROPS,
};

export const WithFirstAndLast = Template.bind({});
WithFirstAndLast.args = {
	...DEFAULT_PROPS,
	showFirstAndLastButtons: true,
};

export const NoLabels = Template.bind({});
NoLabels.args = {
	...DEFAULT_PROPS,
	showFirstAndLastButtons: true,
	showButtonLabels: false,
};
