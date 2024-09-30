import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

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

export default {
	title: 'Components/Pagination',
	component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
	<PaginationStoryComponent>
		<Pagination {...args} />
	</PaginationStoryComponent>
);

const DEFAULT_ARGS = {
	pageCount: 5,
	displayCount: 5,
	currentPage: 0,
	onPageChange: (page: number) => action(`page index is ${page}`),
	showFirstLastNumbers: true,
	renderPreviousButton: () => renderButton('Vorige'),
	renderNextButton: () => renderButton('Volgende'),
};

export const Default = Template.bind({});
Default.args = {
	...DEFAULT_ARGS,
};

export const WithFirstLastNumbers = Template.bind({});
WithFirstLastNumbers.args = {
	...DEFAULT_ARGS,
	pageCount: 9,
};

export const WithFirstLastButtons = Template.bind({});
WithFirstLastButtons.args = {
	pageCount: 9,
	renderFirstButton: () => renderButton('Eerste'),
	renderLastButton: () => renderButton('Laatste'),
};
