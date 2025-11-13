import type { Meta, StoryObj } from '@storybook/react-vite';
import { cloneElement, type ReactElement, useState } from 'react';
import { action } from 'storybook/actions';

import Pagination from './Pagination';

const PaginationStoryComponent = ({
	children,
	initialPageIndex = 0,
}: {
	children: ReactElement;
	initialPageIndex?: number;
}) => {
	const [currentPage, setCurrentPage] = useState(initialPageIndex);

	return cloneElement(children, {
		currentPage,
		onPageChange: (index: number) => {
			action('page changed')(index);
			setCurrentPage(index);
		},
	});
};

const renderButton = (label: string) => <span>{label}</span>;

const meta: Meta<typeof Pagination> = {
	title: 'Components/Pagination',
	component: Pagination,
};
export default meta;
type Story = StoryObj<typeof Pagination>;

const DEFAULT_ARGS = {
	pageCount: 5,
	displayCount: 5,
	currentPage: 0,
	onPageChange: (page: number) => action(`page index is ${page}`),
	showFirstLastNumbers: true,
	renderPreviousButton: () => renderButton('Vorige'),
	renderNextButton: () => renderButton('Volgende'),
};

const Template = (args: any) => (
	<PaginationStoryComponent>
		<Pagination {...args} />
	</PaginationStoryComponent>
);

export const Default: Story = {
	args: {
		...DEFAULT_ARGS,
	},
	render: Template,
};

export const WithFirstLastNumbers: Story = {
	args: {
		...DEFAULT_ARGS,
		pageCount: 9,
	},
	render: Template,
};

export const WithFirstLastButtons: Story = {
	args: {
		pageCount: 9,
		renderFirstButton: () => renderButton('Eerste'),
		renderLastButton: () => renderButton('Laatste'),
	},
	render: Template,
};
