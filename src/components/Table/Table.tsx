import React, { FC, useMemo } from 'react';
import { HeaderGroup, usePagination, useSortBy, useTable } from 'react-table';

import { defaultSortingIcons } from './Table.const';
import { TableProps } from './Table.types';

const Table: FC<TableProps<object>> = ({
	options,
	sortingIcons = defaultSortingIcons,
	pagination,
}) => {
	const data = useMemo(() => options.data, [options.data]);
	const columns = useMemo(() => options.columns, [options.columns]);

	const instance = useTable(
		{ ...options, manualSortBy: true, columns, data },
		useSortBy,
		usePagination
	);

	const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } = instance;

	const renderSortingIndicator = (column: HeaderGroup) => {
		if (!column.canSort || column.disableSortBy) return null;

		if (column.isSorted) {
			return column.isSortedDesc ? sortingIcons.desc : sortingIcons.asc;
		}

		return sortingIcons.default;
	};

	return (
		<>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((group, i) => (
						<tr {...group.getHeaderGroupProps()} key={i}>
							{group.headers.map((column, j) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									key={`${i}-${j}`}
								>
									{column.render('Header')}
									{renderSortingIndicator(column)}
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);

						return (
							<tr {...row.getRowProps()} key={i}>
								{row.cells.map((cell, j) => {
									return (
										<td {...cell.getCellProps()} key={`${i}-${j}`}>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>

			{pagination && pagination(instance)}
		</>
	);
};

export default Table;
