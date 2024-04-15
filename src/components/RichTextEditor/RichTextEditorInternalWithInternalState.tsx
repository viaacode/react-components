import BraftEditor, { EditorState, MediaType } from 'braft-editor';
import Table from 'braft-extensions/dist/table';
import clsx from 'clsx';
import React, { FunctionComponent, useEffect, useState } from 'react';

import { getLanguage } from './RichTextEditor.consts';
import { getHiddenHeadingClasses } from './RichTextEditor.helpers';
import {
	ALL_RICH_TEXT_HEADINGS,
	RichTextEditorWithInternalStateProps,
} from './RichTextEditor.types';

import './RichTextEditor.scss';

const RichTextEditorInternal: FunctionComponent<RichTextEditorWithInternalStateProps> = ({
	braft,
	className,
	controls,
	disabled,
	id,
	value,
	media,
	onBlur,
	onChange,
	onDelete,
	onFocus,
	onSave,
	onTab,
	placeholder,
	enabledHeadings = ALL_RICH_TEXT_HEADINGS,
	rootClassName: root = 'c-rich-text-editor',
}) => {
	const [richTextEditorState, setRichTextEditorState] = useState<EditorState | null>(null);

	useEffect(() => {
		if (value && !richTextEditorState) {
			setRichTextEditorState(BraftEditor.createEditorState(value || ''));
		}
	}, [value, richTextEditorState]);

	useEffect(() => {
		const newValue: string = richTextEditorState?.toHTML() || '';
		if (newValue.replace('<p></p>', '').trim() && newValue !== value) {
			onChange?.(newValue);
		}
		// Do not include value in the dependency array since it would cause an infinite react render loop
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onChange, richTextEditorState]);

	const tableOptions = {
		columnResizable: false, //  Whether to allow drag to adjust the column width, default false
		defaultColumns: 3, //  default number of columns
		defaultRows: 3, //  default number of rows
		exportAttrString: 'class="c-editor-table"', //  Specify the attribute string attached to the table tag when outputting HTML
		withDropdown: true, //  Whether a drop-down menu pops up before inserting a table
	};

	BraftEditor.use(Table(tableOptions));

	return (
		<div
			className={clsx(
				root,
				className,
				getHiddenHeadingClasses(enabledHeadings),
				'c-content',
				{ disabled }
			)}
			id={id}
		>
			<BraftEditor
				{...braft}
				controls={controls}
				id={id}
				language={getLanguage}
				media={media as unknown as MediaType}
				onBlur={() => onBlur?.()}
				onChange={setRichTextEditorState}
				onDelete={onDelete}
				onFocus={onFocus}
				onSave={() => richTextEditorState && onSave?.()}
				onTab={onTab}
				placeholder={placeholder}
				readOnly={disabled}
				value={richTextEditorState}
			/>
		</div>
	);
};

export default RichTextEditorInternal;
