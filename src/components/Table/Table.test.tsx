import { fireEvent, render, screen } from '@testing-library/react';
import { mockColumns, mockData } from './__mocks__/table.js';
import { defaultSortingIcons } from './Table.const.js';
import Table from './Table.js';
import type { TableData, TableProps } from './Table.types.js';

const renderTable = <T extends TableData>(props: TableProps<T>) => {
	return render(<Table {...props} />);
};

describe('<Table />', () => {
	it('Should be able to render without any items', () => {
		renderTable({
			options: {
				columns: mockColumns,
				data: [],
			},
		});

		for (const col of mockColumns) {
			const text = col.Header as string;

			if (text) {
				expect(screen.getByText(new RegExp(text))).toBeDefined();
			}
		}
	});

	it('Should be able to render with items', () => {
		renderTable({
			options: {
				columns: mockColumns,
				data: mockData,
			},
		});

		for (const row of mockData) {
			const { name, id } = row;

			if (id !== undefined) {
				expect(screen.getByText(id)).toBeDefined();
			}

			if (name) {
				expect(screen.getByText(name)).toBeDefined();
			}
		}
	});

	it('Should be able to render custom cell content', () => {
		renderTable({
			options: {
				columns: mockColumns,
				data: mockData,
			},
		});

		for (const row of mockData) {
			const { created_at } = row;

			if (created_at) {
				expect(screen.getByText(new Date(created_at).toLocaleDateString())).toBeDefined();
			}
		}
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

		expect(screen.getAllByText(new RegExp(defaultSortingIcons.default as string)).length).toEqual(
			filterableCols.length
		);
	});

	it('Should communicate sorting actions through onSortChange', () => {
		const onSortChange = jest.fn();

		renderTable({
			options: {
				columns: mockColumns,
				data: mockData,
			},
			onSortChange,
		});

		// Initial output
		expect(onSortChange).toHaveBeenCalledTimes(1);

		const filterableCol = mockColumns.find(({ Header, disableSortBy }) => !disableSortBy && Header);

		if (filterableCol) {
			const header = screen.getByText(new RegExp(filterableCol.Header as string));

			fireEvent.click(header);

			expect(onSortChange).toHaveBeenCalledTimes(2);
		} else {
			expect(false).toEqual(true);
		}
	});

	it('Should keep track of and communicate sorting state', () => {
		const onSortChange = jest.fn();

		renderTable({
			options: {
				columns: mockColumns,
				data: mockData,
			},
			onSortChange,
		});

		const filterableCol = mockColumns.find(({ Header, disableSortBy }) => !disableSortBy && Header);

		if (filterableCol) {
			const text = filterableCol.Header as string;
			const header = screen.getByText(new RegExp(text));

			fireEvent.click(header); // 1 ASC
			fireEvent.click(header); // 2 DESC
			fireEvent.click(header); // 3 NONE

			expect(onSortChange.mock.calls[0]).toEqual([undefined, undefined]);
			expect(onSortChange.mock.calls[1]).toEqual([text.toLowerCase(), 'asc']);
			expect(onSortChange.mock.calls[2]).toEqual([text.toLowerCase(), 'desc']);
			expect(onSortChange.mock.calls[3]).toEqual([undefined, undefined]);
		} else {
			expect(false).toEqual(true);
		}
	});

	it('Should communicate clicks on rows through onRowClick', () => {
		const onRowClick = jest.fn();

		renderTable({
			options: {
				columns: mockColumns,
				data: mockData,
			},
			onRowClick,
		});

		const header = screen.getByText(new RegExp(mockData[0].name));
		fireEvent.click(header);

		expect(onRowClick).toHaveBeenCalledTimes(1);
	});

	it('Should be able to set props on table elements', () => {
		const headerClass = 'header-class';
		const colClass = 'col-class';
		const rowClass = 'row-class';
		const cellClass = 'cell-class';
		const headerStyle = { padding: 0 };
		renderTable({
			options: {
				columns: mockColumns,
				data: mockData,
			},
			getHeaderProps: () => ({ className: headerClass, style: headerStyle }),
			getColumnProps: () => ({ className: colClass }),
			getRowProps: () => ({ className: rowClass }),
			getCellProps: () => ({ className: cellClass }),
		});

		const header = screen.getByText(mockColumns[0].Header as string);
		const cell = screen.getByText(mockData[0].name);
		const row = cell.parentElement;

		expect(header).toHaveClass(headerClass, colClass);
		expect(header).toHaveStyle(headerStyle);
		expect(cell).toHaveClass(cellClass, colClass);
		expect(row).toHaveClass(rowClass);
	});
});
