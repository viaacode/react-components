import {
	type Column,
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
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
	const columns = useMemo(() => options.columns as ColumnDef<RowDataType>[], [options.columns]);

	const table = useReactTable<RowDataType>({
		data,
		columns,
		getRowId: (row) => row.id?.toString() ?? '',
		state: { sorting },
		onSortingChange: setSorting,
		manualSorting: true,
		enableMultiSort: false,
		autoResetPageIndex: false,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, row: Row<RowDataType>) => {
		if (enableRowFocusOnClick) {
			setFocusedRowId(row.id);
		}
		onRowClick?.(event, row);
	};

	// Effects

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
		if (enableRowFocusOnClick && focusedRowId && !table.getRowModel().rowsById[focusedRowId]) {
			setFocusedRowId(null);
		}
	}, [enableRowFocusOnClick, table, focusedRowId]);

	// Render

	const renderSortingIndicator = (column: Column<RowDataType, unknown>) => {
		if (!column.getCanSort()) return null;

		const sorted = column.getIsSorted();
		if (sorted === 'desc') return sortingIcons.desc;
		if (sorted === 'asc') return sortingIcons.asc;
		return sortingIcons.default;
	};

	return (
		showTable && (
			<>
				<div className={clsx(bem('scroller'), enableRowFocusOnClick && bem('with-row-focus'))}>
					<table className={rootCls} style={style}>
						<thead className={clsx(bem('wrapper'), bem('wrapper', 'header'))}>
							{table.getHeaderGroups().map((headerGroup, i) => (
								<tr
									// biome-ignore lint/suspicious/noArrayIndexKey: TODO fix
									key={i}
									className={clsx(bem('row'), bem('row', 'header'))}
								>
									{enableRowFocusOnClick && (
										<th role="columnheader" className={clsx(thClass(false), focusedTdClass(false))}>
											&nbsp;
										</th>
									)}
									{headerGroup.headers.map((header, j) => (
										<th
											// biome-ignore lint/suspicious/noArrayIndexKey: TODO fix
											key={`${i}-${j}`}
											className={thClass(header.column.getIsSorted() !== false)}
											onClick={header.column.getToggleSortingHandler()}
											{...getColumnProps(header.column)}
											{...getHeaderProps(header)}
										>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
											{renderSortingIndicator(header.column)}
										</th>
									))}
								</tr>
							))}
						</thead>

						<tbody className={clsx(bem('wrapper'), bem('wrapper', 'body'))}>
							{table.getRowModel().rows.map((row, i) => (
								<tr
									key={row.id}
									onClick={(e) => handleRowClick(e, row)}
									className={trBodyClass}
									{...getRowProps(row)}
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
									{row.getVisibleCells().map((cell, j) => (
										<td
											// biome-ignore lint/suspicious/noArrayIndexKey: TODO fix
											key={`${i}-${j}`}
											className={tdClass}
											{...getColumnProps(cell.column)}
											{...getCellProps(cell)}
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{pagination && <div className={clsx(bem('footer'))}>{pagination(table)}</div>}
			</>
		)
	);
};

export default Table;
