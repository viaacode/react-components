import BraftEditor, { EditorState, ExtendControlType, MediaType } from 'braft-editor';
import Table from 'braft-extensions/dist/table';
import clsx from 'clsx';
import beautify from 'js-beautify';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

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
	const [isHtmlView, setIsHtmlView] = useState(false);
	const [toolbarHeight, setToolbarHeight] = useState(0);
	const [html, setHtml] = useState(initialHtml);
	const [perttyHtml, setPrettyHtml] = useState('');
	const htmlEditRef = useRef<HTMLPreElement | null>(null);

	useEffect(() => {
		const toolbarElement = document.querySelector('.bf-controlbar');
		if (!toolbarElement) return;
		const height = toolbarElement.getBoundingClientRect().height;
		setToolbarHeight(height);
	}, []);

	useEffect(() => {
		const formattedHtml = beautify.html(state?.toHTML() || '', {
			indent_size: 2,
		});
		setPrettyHtml(formattedHtml);
	}, [state]);

	const tableOptions = {
		columnResizable: false, //  Whether to allow drag to adjust the column width, default false
		defaultColumns: 3, //  default number of columns
		defaultRows: 3, //  default number of rows
		exportAttrString: 'class="c-editor-table"', //  Specify the attribute string attached to the table tag when outputting HTML
		withDropdown: true, //  Whether a drop-down menu pops up before inserting a table
	};

	BraftEditor.use(Table(tableOptions));

	const newControls = controls
		? [
				...(controls || []),
				controls?.includes('editHtml') &&
					({
						key: 'editHtml',
						type: 'button',
						title: 'HTML',
						html: 'HTML',
						text: 'HTML',
						className: isHtmlView ? 'active' : '',
						onClick: () => {
							if (isHtmlView) {
								onChange?.(BraftEditor.createEditorState(html || ''));
							}
							setIsHtmlView((prev) => !prev);
						},
						disabled: false,
					} as ExtendControlType),
		  ]
		: undefined;

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
				controls={newControls as ExtendControlType[]}
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
			{isHtmlView ? (
				<pre
					ref={htmlEditRef}
					style={{
						top: `${toolbarHeight}px`,
					}}
					className={`${root}__html-view`}
					onBlur={() => {
						onChange?.(BraftEditor.createEditorState(html || ''));
					}}
					contentEditable={true}
					onInput={() => {
						const html = htmlEditRef.current?.innerText;
						setHtml(html || '');
					}}
				>
					{perttyHtml}
				</pre>
			) : null}
		</div>
	);
};

export default RichTextEditorInternal;
