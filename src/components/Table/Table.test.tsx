import { render, screen } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';

import Table from './Table';
import { defaultSortingIcons } from './Table.const';
import { TableProps } from './Table.types';
import { mockColumns, mockData } from './__mocks__/table';

const renderTable = ({ ...rest }: PropsWithChildren<TableProps<object>>) => {
	return render(<Table {...rest} />);
};

describe('<Table />', () => {
	it('Should be able to render without any items', () => {
		renderTable({
			options: {
				columns: mockColumns,
				data: [],
			},
		});

		mockColumns.forEach((col) => {
			const text = col.Header as string;

			if (text) {
				expect(screen.getByText(new RegExp(text))).toBeDefined();
			}
		});
	});

	it('Should be able to render with items', () => {
		renderTable({
			options: {
				columns: mockColumns,
				data: mockData,
			},
		});

		mockData.forEach((row) => {
			const { name, id } = row;

			if (id !== undefined) {
				expect(screen.getByText(id)).toBeDefined();
			}

			if (name) {
				expect(screen.getByText(name)).toBeDefined();
			}
		});
	});

	it('Should be able to render custom cell content', () => {
		renderTable({
			options: {
				columns: mockColumns,
				data: mockData,
			},
		});

		mockData.forEach((row) => {
			const { created_at } = row;

			if (created_at) {
				expect(screen.getByText(new Date(created_at).toLocaleDateString())).toBeDefined();
			}
		});
	});

	it('Should render sorting icons by default', () => {
		renderTable({
			options: {
				columns: mockColumns,
				data: [],
			},
		});

		const filterableCols = mockColumns.filter((col) => {
			const { Header, disableSortBy } = col;
			return !disableSortBy && Header;
		});

		expect(
			screen.getAllByText(new RegExp(defaultSortingIcons.default as string)).length
		).toEqual(filterableCols.length);
	});
});
