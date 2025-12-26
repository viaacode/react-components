import { AvoSearchOrderDirection } from '@viaa/avo2-types';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { type HeaderGroup, usePagination, useSortBy, useTable } from 'react-table';
import { bemCls, getVariantClasses } from '../../utils';
import { defaultPropGetter, defaultSortingIcons } from './Table.const';
import type { TableData, TableProps } from './Table.types';

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
	const trBodyClass = clsx(bem('row'), bem('row', 'body'));
	const tdClass = clsx(bem('cell'), bem('cell', 'body'));
	const thClass = (isSorted: boolean) =>
		clsx(bem('cell'), bem('cell', 'header'), isSorted && bem('cell', 'active'));

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
								// biome-ignore lint/suspicious/noArrayIndexKey: TODO fix
								key={i}
								className={clsx(bem('row'), bem('row', 'header'))}
							>
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

					<tbody className={clsx(bem('wrapper'), bem('wrapper', 'body'))} {...getTableBodyProps()}>
						{page.map((row, i) => {
							prepareRow(row);

							return (
								<tr
									onClick={(e) => onRowClick?.(e, row)}
									{...row.getRowProps([{ className: trBodyClass }, getRowProps(row)])}
									// biome-ignore lint/suspicious/noArrayIndexKey: TODO fix
									key={i}
								>
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
	);
};

export default Table;
