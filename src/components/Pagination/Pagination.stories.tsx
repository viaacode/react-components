import { storiesOf } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers/action';

import Pagination from './Pagination';

const button = (label: string) => <span>{label}</span>;

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

storiesOf('v1/components/Pagination', module)
	.addParameters({ jest: ['Pagination'] })
	.add('Pagination', () => (
		<PaginationStoryComponent initialPageIndex={0}>
			<Pagination
				pageCount={20}
				buttons={{ previous: button('previous'), next: button('next') }}
			/>
		</PaginationStoryComponent>
	))
	.add('Pagination with options', () => (
		<PaginationStoryComponent initialPageIndex={9}>
			<Pagination
				pageCount={20}
				displayCount={7}
				buttons={{ previous: button('previous'), next: button('next') }}
			/>
		</PaginationStoryComponent>
	));
