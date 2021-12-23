import classnames from 'classnames';
import { cloneDeep } from 'lodash-es';
import React, { FunctionComponent, ReactNode, useState } from 'react';

import { useTableSort } from '../../hooks/useTableSort';
import { DefaultProps } from '../../types';
import { Form } from '../Form/Form';
import { FormGroup } from '../Form/FormGroup/FormGroup';
import { Pagination } from '../Pagination/Pagination';
import { Spacer } from '../Spacer/Spacer';
import { Table } from '../Table/Table';
import { TextArea } from '../TextArea/TextArea';
import { TextInput } from '../TextInput/TextInput';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarRight } from '../Toolbar/Toolbar.slots';
import { ToolbarItem } from '../Toolbar/ToolbarItem/ToolbarItem';

import './KeyValueEditor.scss';

export type KeyValuePairSchema = [string, string];
export type KeyValuePairs = KeyValuePairSchema[];
export type KeyValueEditorTableColsSchema = '0' | '1';

const ENTRIES_PER_PAGE = 20;

export interface KeyValueEditorPropsSchema extends DefaultProps {
	initialData: KeyValuePairs;
	data: KeyValuePairs;
	keyLabel?: string;
	valueLabel?: string;
	keySeparator?: string;
	readonly?: boolean;
	onChange?: (modifiedData: KeyValuePairs) => void;
	className?: string;
	noDataMessage?: string;
	noDataForFilterMessage?: string;
}

/**
 * Shows a tabular view of the data and allows the user to edit the data
 * @param initialData Contains the key value pairs when the page is loaded, and are only updated on save
 *        This extra prop is needed so we can keep fields visible that were searched for, while the user is modifying them
 * @param data Contains the key value pairs while the user is modifying them, updated on every key stroke
 * @param keyLabel
 * @param valueLabel
 * @param keySeparator
 * @param readonly
 * @param onChange
 * @param className
 * @param noDataMessage
 * @param noDataForFilterMessage
 * @constructor
 */
export const KeyValueEditor: FunctionComponent<KeyValueEditorPropsSchema> = ({
	initialData,
	data,
	keyLabel = 'Id',
	valueLabel = 'Waarde',
	keySeparator = '___',
	readonly = false,
	onChange = () => null,
	className,
	noDataMessage = 'Geen data',
	noDataForFilterMessage = 'Geen data die voldoet aan de filter',
}) => {
	const [filterString, setFilterString] = useState<string>('');
	const [page, setPage] = useState<number>(0);
	const [sortColumn, sortOrder, handleSortClick] =
		useTableSort<KeyValueEditorTableColsSchema>('0');

	const getPaginatedData = (): [KeyValuePairs, number] => {
		const filteredItems = data.filter((row) => {
			const query = filterString.toLowerCase();

			// If key or value contains the searched value, show the row
			if (row[0].toLowerCase().includes(query) || row[1].toLowerCase().includes(query)) {
				return true;
			}

			// If the initial row value contains the searched value, show the row
			const initialRow = initialData.find((initialRow) => initialRow[0] === row[0]);
			if (initialRow && initialRow[1].toLowerCase().includes(query)) {
				return true;
			}

			// Else, do not show the row
			return false;
		});
		const sortedItems = filteredItems.sort((rowA: [string, string], rowB: [string, string]) => {
			if (rowA[sortColumn].toLowerCase() < rowB[sortColumn].toLowerCase()) {
				return sortOrder === 'asc' ? 1 : -1;
			}
			if (rowA[sortColumn].toLowerCase() > rowB[sortColumn].toLowerCase()) {
				return sortOrder === 'asc' ? -1 : 1;
			}
			return 0;
		});
		return [
			sortedItems.slice(page * ENTRIES_PER_PAGE, (page + 1) * ENTRIES_PER_PAGE),
			sortedItems.length,
		];
	};

	const onValueChanged = (value: string, key: string) => {
		const modifiedData: KeyValuePairs = cloneDeep(data);
		const row: [string, string] | undefined = modifiedData.find(
			(dataItem) => dataItem[0] === key
		);
		if (row) {
			row[1] = value;
			onChange(modifiedData);
		}
	};

	const renderCell = (
		rowData: KeyValuePairSchema,
		columnId: KeyValueEditorTableColsSchema
	): ReactNode | null => {
		switch (columnId) {
			case '0': {
				const keyParts = rowData[0].split(keySeparator);
				return (
					<div>
						<div className="c-keyvalue-label c-keyvalue-path">{keyParts[0]}</div>
						{!!keyParts[1] && (
							<div className="c-keyvalue-label c-keyvalue-translaton">
								{keyParts[1]}
							</div>
						)}
					</div>
				);
			}
			case '1':
				if (readonly) {
					return <span className="c-keyvalue-label">{rowData[1]}</span>;
				}

				return (
					<TextArea
						height="auto"
						value={rowData[1]}
						onChange={(value) => onValueChanged(value, rowData[0])}
					/>
				);

			default:
				return null;
		}
	};

	const [paginatedData, totalFilteredResults] = getPaginatedData();
	return (
		<div className={classnames('c-key-value-editor', className)}>
			<Toolbar>
				<ToolbarRight>
					<ToolbarItem>
						<Form type="inline">
							<FormGroup>
								<TextInput
									icon="filter"
									value={filterString}
									onChange={setFilterString}
								/>
							</FormGroup>
						</Form>
					</ToolbarItem>
				</ToolbarRight>
			</Toolbar>
			{!!paginatedData && !!paginatedData.length ? (
				<Table
					columns={[
						{ id: '0', label: keyLabel, col: '5', sortable: true },
						{ id: '1', label: valueLabel, col: '7', sortable: true },
					]}
					data={paginatedData}
					emptyStateMessage={filterString ? noDataMessage : noDataForFilterMessage}
					onColumnClick={(columnId) =>
						handleSortClick(columnId as KeyValueEditorTableColsSchema)
					}
					renderCell={(rowData: KeyValuePairSchema, columnId: string) =>
						renderCell(rowData, columnId as KeyValueEditorTableColsSchema)
					}
					rowKey={'0'}
					variant="bordered"
					sortColumn={sortColumn}
					sortOrder={sortOrder}
				/>
			) : (
				<>Geen resultaten</>
			)}
			<Spacer margin="top-large">
				<Pagination
					pageCount={Math.ceil(totalFilteredResults / ENTRIES_PER_PAGE)}
					onPageChange={setPage}
					currentPage={page}
				/>
			</Spacer>
		</div>
	);
};
