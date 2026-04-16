import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type Header,
	type Row,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { AvoSearchOrderDirection } from '@viaa/avo2-types';
import clsx from 'clsx';
import type { MouseEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
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
	const [sorting, setSorting] = useState<SortingState>([]);

	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));
	const trBodyClass = clsx(bem('row'), bem('row', 'body'));
	const tdClass = clsx(bem('cell'), bem('cell', 'body'));
	const thClass = (isSorted: boolean) =>
		clsx(bem('cell'), bem('cell', 'header'), isSorted && bem('cell', 'active'));
	const focusedTdClass = (isFocused: boolean) =>
		clsx(bem('focus-cell'), isFocused && bem('focus-cell', 'active'));

	const data = useMemo(() => options.data, [options.data]);
	const columns = useMemo(() => options.columns, [options.columns]);

	const table = useReactTable<RowDataType>({
		data,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualSorting: true,
		enableMultiSort: false,
		getRowId: (row) => row.id?.toString(),
	});

	const headerGroups = table.getHeaderGroups();
	const rows = table.getPaginationRowModel().rows;
	const rowsById = table.getRowModel().rowsById;

	const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, row: Row<RowDataType>) => {
		if (enableRowFocusOnClick) {
			setFocusedRowId(row.id);
		}
		onRowClick?.(event, row);
	};

	useEffect(() => {
		const orderProp = sorting[0]?.id || undefined;
		let orderDirection: AvoSearchOrderDirection | undefined;
		if (sorting[0]) {
			orderDirection = sorting[0].desc ? AvoSearchOrderDirection.DESC : AvoSearchOrderDirection.ASC;
		} else {
			orderDirection = undefined;
		}
		onSortChange?.(orderProp, orderDirection);
	}, [sorting, onSortChange]);

	useEffect(() => {
		// We have row focus enabled, have a focused row but the data changed and the row is not available anymore
		if (enableRowFocusOnClick && focusedRowId && !rowsById[focusedRowId]) {
			setFocusedRowId(null);
		}
	}, [enableRowFocusOnClick, rowsById, focusedRowId]);

	// Render

	const renderSortingIndicator = (header: Header<RowDataType, unknown>) => {
		if (!header.column.getCanSort()) return null;
		const sortDir = header.column.getIsSorted();
		if (sortDir === 'asc') return sortingIcons.asc;
		if (sortDir === 'desc') return sortingIcons.desc;
		return sortingIcons.default;
	};

	return (
		showTable && (
			<>
				<div className={clsx(bem('scroller'), enableRowFocusOnClick && bem('with-row-focus'))}>
					<table className={rootCls} style={style}>
						<thead className={clsx(bem('wrapper'), bem('wrapper', 'header'))}>
							{headerGroups.map((group, i) => (
								<tr
									// biome-ignore lint/suspicious/noArrayIndexKey: TODO fix
									key={i}
									className={clsx(bem('row'), bem('row', 'header'))}
								>
									{enableRowFocusOnClick && (
										<td role="presentation" className={clsx(thClass(false), focusedTdClass(false))}>
											&nbsp;
										</td>
									)}
									{group.headers.map((header) => {
										const column = header.column;
										const isSorted = column.getIsSorted() !== false;

										const columnProps = getColumnProps(column);
										const headerProps = getHeaderProps(header);

										const sortingHandler = column.getCanSort()
											? column.getToggleSortingHandler()
											: undefined;

										return (
											<th
												key={header.id}
												onClick={sortingHandler}
												className={clsx(
													thClass(isSorted),
													columnProps?.className,
													headerProps?.className
												)}
												style={{
													...columnProps?.style,
													...headerProps?.style,
												}}
												{...columnProps}
												{...headerProps}
											>
												{flexRender(column.columnDef.header, header.getContext())}
												{renderSortingIndicator(header)}
											</th>
										);
									})}
								</tr>
							))}
						</thead>

						<tbody className={clsx(bem('wrapper'), bem('wrapper', 'body'))}>
							{rows.map((row) => {
								const rowProps = getRowProps(row);

								return (
									<tr
										key={row.id}
										onClick={(e) => handleRowClick(e, row)}
										className={clsx(trBodyClass, rowProps?.className)}
										style={rowProps?.style}
										{...rowProps}
									>
										{enableRowFocusOnClick && (
											<td className={focusedTdClass(row.id === focusedRowId)}>
												<button
													type="button"
													aria-label="Focus row"
													className={bem('focus-button')}
													onClick={(e) => {
														e.stopPropagation();
														handleRowClick(e as unknown as MouseEvent<HTMLTableRowElement>, row);
													}}
													onFocus={() => setFocusedRowId(row.id)}
												>
													&nbsp;
												</button>
											</td>
										)}
										{row.getVisibleCells().map((cell) => {
											const columnProps = getColumnProps(cell.column);
											const cellProps = getCellProps(cell.column);

											return (
												<td
													key={cell.id}
													className={clsx(tdClass, columnProps?.className, cellProps?.className)}
													style={{
														...columnProps?.style,
														...cellProps?.style,
													}}
													{...columnProps}
													{...cellProps}
												>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				{pagination && <div className={clsx(bem('footer'))}>{pagination(table)}</div>}
			</>
		)
	);
};

export default Table;
