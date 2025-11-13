import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';

import PaginationBar from './PaginationBar';
import type { PaginationBarProps } from './PaginationBar.types';

const meta: Meta<typeof PaginationBar> = {
	title: 'Components/PaginationBar',
	component: PaginationBar,
};
export default meta;
type Story = StoryObj<typeof PaginationBar>;

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

const PaginationBarTemplate = (args: any) => {
	const [startItem, setStartItem] = useState(args.startItem);

	const handlePageChange = (newPage: number) => {
		setStartItem(newPage * args.itemsPerPage);
		action('pagechange')(newPage);
	};

	return <PaginationBar {...args} startItem={startItem} onPageChange={handlePageChange} />;
};

export const Default: Story = {
	args: {
		...DEFAULT_PROPS,
	},
	render: PaginationBarTemplate,
};

export const WithFirstAndLast: Story = {
	args: {
		...DEFAULT_PROPS,
		showFirstAndLastButtons: true,
	},
	render: PaginationBarTemplate,
};

export const NoLabels: Story = {
	args: {
		...DEFAULT_PROPS,
		showFirstAndLastButtons: true,
		showButtonLabels: false,
	},
	render: PaginationBarTemplate,
};
