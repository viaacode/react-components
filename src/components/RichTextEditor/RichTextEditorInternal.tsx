import BraftEditor, { EditorState, MediaType } from 'braft-editor';
import Table from 'braft-extensions/dist/table';
import clsx from 'clsx';
import React, { FunctionComponent } from 'react';

import { getLanguage } from './RichTextEditor.consts';
import { getHiddenHeadingClasses } from './RichTextEditor.helpers';
import { ALL_RICH_TEXT_HEADINGS, RichTextEditorProps } from './RichTextEditor.types';

import './RichTextEditor.scss';

const RichTextEditorInternal: FunctionComponent<RichTextEditorProps> = ({
	braft,
	className,
	controls,
	disabled,
	id,
	initialHtml,
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
	state,
}) => {
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
				onChange={(newState: EditorState) => onChange?.(newState)}
				onDelete={onDelete}
				onFocus={onFocus}
				onSave={() => state && onSave?.()}
				onTab={onTab}
				placeholder={placeholder}
				readOnly={disabled}
				value={state || BraftEditor.createEditorState(initialHtml || '')}
			/>
		</div>
	);
};

export default RichTextEditorInternal;
