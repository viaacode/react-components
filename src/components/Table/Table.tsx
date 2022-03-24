import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';
import { HeaderGroup, usePagination, useSortBy, useTable } from 'react-table';

import { bemCls, getVariantClasses } from '../../utils';

import { defaultPropGetter, defaultSortingIcons } from './Table.const';
import { TableData, TableProps } from './Table.types';

const Table = <D extends TableData>({
	className,
	getCellProps = defaultPropGetter,
	getColumnProps = defaultPropGetter,
	getHeaderProps = defaultPropGetter,
	getRowProps = defaultPropGetter,
	onRowClick,
	onSortChange,
	options,
	pagination,
	rootClassName: root = 'c-table',
	sortingIcons = defaultSortingIcons,
	style,
	variants,
}: TableProps<D>) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	// State

	const data = useMemo(() => options.data, [options.data]);
	const columns = useMemo(() => options.columns, [options.columns]);

	const instance = useTable(
		{ ...options, manualSortBy: true, disableMultiSort: true, columns, data },
		useSortBy,
		usePagination
	);

	// Destructuring

	const {
		getTableBodyProps,
		getTableProps,
		headerGroups,
		page,
		prepareRow,
		state: { sortBy },
	} = instance;

	// Effects

	useEffect(() => {
		onSortChange?.(sortBy);
	}, [sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

	// Render

	const renderSortingIndicator = (column: HeaderGroup<D>) => {
		if (!column.canSort || column.disableSortBy) return null;

		if (column.isSorted) {
			return column.isSortedDesc ? sortingIcons.desc : sortingIcons.asc;
		}

		return sortingIcons.default;
	};

	return (
		<>
			<div className={clsx(bem('scroller'))}>
				<table {...getTableProps()} className={rootCls} style={style}>
					<thead className={clsx(bem('wrapper'), bem('wrapper', 'header'))}>
						{headerGroups.map((group, i) => (
							<tr
								{...group.getHeaderGroupProps()}
								key={i}
								className={clsx(bem('row'), bem('row', 'header'))}
							>
								{group.headers.map((column, j) => (
									<th
										{...column.getHeaderProps([
											column.getSortByToggleProps(),
											getColumnProps(column),
											getHeaderProps(column),
										])}
										className={clsx(
											bem('cell'),
											bem('cell', 'header'),
											column.isSorted && bem('cell', 'active')
										)}
										key={`${i}-${j}`}
									>
										{column.render('Header')}

										{renderSortingIndicator(column)}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody
						className={clsx(bem('wrapper'), bem('wrapper', 'body'))}
						{...getTableBodyProps()}
					>
						{page.map((row, i) => {
							prepareRow(row);

							return (
								<tr
									onClick={(e) => onRowClick && onRowClick(e, row)}
									className={clsx(bem('row'), bem('row', 'body'))}
									{...row.getRowProps(getRowProps(row))}
									key={i}
								>
									{row.cells.map((cell, j) => {
										return (
											<td
												{...cell.getCellProps([getCellProps(cell.column)])}
												className={clsx(bem('cell'), bem('cell', 'body'))}
												key={`${i}-${j}`}
											>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{pagination && <div className={clsx(bem('footer'))}>{pagination(instance)}</div>}
		</>
	);
};

export default Table;
