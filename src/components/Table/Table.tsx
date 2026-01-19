import { AvoSearchOrderDirection } from '@viaa/avo2-types';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { type HeaderGroup, type Row, usePagination, useSortBy, useTable } from 'react-table';
import { bemCls, getVariantClasses } from '../../utils';
import { defaultPropGetter, defaultSortingIcons } from './Table.const';
import type { TableData, TableProps } from './Table.types';

const Table = <RowDataType extends TableData>({
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
	showTable = true,
	enableRowFocusOnClick = false,
}: TableProps<RowDataType>) => {
	const [focusedRowId, setFocusedRowId] = useState<string | null>(null);

	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));
	const trBodyClass = clsx(bem('row'), bem('row', 'body'));
	const tdClass = clsx(bem('cell'), bem('cell', 'body'));
	const thClass = (isSorted: boolean) =>
		clsx(bem('cell'), bem('cell', 'header'), isSorted && bem('cell', 'active'));
	const focusedTdClass = (isFocused: boolean) =>
		clsx(bem('focus-cell'), isFocused && bem('focus-cell', 'active'));

	// State

	const data = useMemo(() => options.data, [options.data]);
	const columns = useMemo(() => options.columns, [options.columns]);

	const instance = useTable(
		{
			getRowId: (row) => row.id?.toString(),
			...options,
			manualSortBy: true,
			disableMultiSort: true,
			autoResetRowState: false,
			columns,
			data,
		},
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
		rowsById,
		state: { sortBy },
	} = instance;

	const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, row: Row<RowDataType>) => {
		if (enableRowFocusOnClick) {
			setFocusedRowId(row.id);
		}
		onRowClick?.(event, row);
	};

	// Effects

	useEffect(() => {
		const orderProp = sortBy[0]?.id || undefined;
		let orderDirection: AvoSearchOrderDirection | undefined;
		if (sortBy[0]) {
			if (sortBy[0].desc) {
				orderDirection = AvoSearchOrderDirection.DESC;
			} else {
				orderDirection = AvoSearchOrderDirection.ASC;
			}
		} else {
			orderDirection = undefined;
		}
		onSortChange?.(orderProp, orderDirection);
	}, [sortBy, onSortChange]);

	useEffect(() => {
		// We have row focus enabled, have a focused row but the data changed and the row is not available anymore
		if (enableRowFocusOnClick && focusedRowId && !rowsById[focusedRowId]) {
			setFocusedRowId(null);
		}
	}, [enableRowFocusOnClick, rowsById]);

	// Render

	const renderSortingIndicator = (column: HeaderGroup<RowDataType>) => {
		if (!column.canSort || column.disableSortBy) return null;

		if (column.isSorted) {
			return column.isSortedDesc ? sortingIcons.desc : sortingIcons.asc;
		}

		return sortingIcons.default;
	};

	return (
		showTable && (
			<>
				<div className={clsx(bem('scroller'), enableRowFocusOnClick && bem('with-row-focus'))}>
					<table {...getTableProps()} className={rootCls} style={style}>
						<thead className={clsx(bem('wrapper'), bem('wrapper', 'header'))}>
							{headerGroups.map((group, i) => (
								<tr
									{...group.getHeaderGroupProps()}
									// biome-ignore lint/suspicious/noArrayIndexKey: TODO fix
									key={i}
									className={clsx(bem('row'), bem('row', 'header'))}
								>
									{enableRowFocusOnClick && (
										<th role="columnheader" className={clsx(thClass(false), focusedTdClass(false))}>
											&nbsp;
										</th>
									)}
									{group.headers.map((column, j) => (
										<th
											{...column.getHeaderProps([
												{ className: thClass(column.isSorted) },
												column.getSortByToggleProps(),
												getColumnProps(column),
												getHeaderProps(column),
											])}
											// biome-ignore lint/suspicious/noArrayIndexKey: TODO fix
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
										onClick={(e) => handleRowClick(e, row)}
										{...row.getRowProps([{ className: trBodyClass }, getRowProps(row)])}
										key={row.id}
									>
										{enableRowFocusOnClick && (
											<td role="cell" className={focusedTdClass(row.id === focusedRowId)}>
												&nbsp;
											</td>
										)}
										{row.cells.map((cell, j) => {
											return (
												<td
													{...cell.getCellProps([
														{ className: tdClass },
														getColumnProps(cell.column),
														getCellProps(cell.column),
													])}
													// biome-ignore lint/suspicious/noArrayIndexKey: TODO fix
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
		)
	);
};

export default Table;
