import BraftEditor, {
	type ControlType,
	type EditorState,
	type ExtendControlType,
	type MediaType,
} from 'braft-editor';
import Table from 'braft-extensions/dist/table';
import clsx from 'clsx';
import { type FunctionComponent, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { getLanguage } from './RichTextEditor.consts.js';
import { getHiddenHeadingClasses, prettifyHtml } from './RichTextEditor.helpers.js';
import {
	ALL_RICH_TEXT_HEADINGS,
	type RichEditorState,
	type RichTextEditorWithInternalStateProps,
} from './RichTextEditor.types.js';

import './RichTextEditor.scss';

const BraftEditorGlobal = BraftEditor as unknown as typeof BraftEditor.default;

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
	const [isHtmlView, setIsHtmlView] = useState(false);
	const [toolbarHeight, setToolbarHeight] = useState(0);
	const [prettyHtml, setPrettyHtml] = useState(prettifyHtml(value || ''));
	const htmlEditRef = useRef<HTMLTextAreaElement | null>(null);
	const [richTextEditorState, setRichTextEditorState] = useState<EditorState>(
		BraftEditorGlobal.createEditorState(value || '')
	);

	useLayoutEffect(() => {
		const toolbarElement = document.querySelector('.bf-controlbar');
		if (!toolbarElement) return;
		const height = toolbarElement.getBoundingClientRect().height;
		setToolbarHeight(height);
	}, []);

	useEffect(() => {
		const controlItems = document.querySelectorAll(
			'.control-item:not(.html-edit-button)'
		) as NodeListOf<HTMLElement>;
		if (isHtmlView) {
			for (const item of controlItems) {
				item.style.opacity = '0.5';
				item.style.pointerEvents = 'none';
			}
		} else {
			for (const item of controlItems) {
				item.style.opacity = '1';
				item.style.pointerEvents = 'auto';
			}
		}
	}, [isHtmlView]);

	const tableOptions = {
		columnResizable: false, //  Whether to allow drag to adjust the column width, default false
		defaultColumns: 3, //  default number of columns
		defaultRows: 3, //  default number of rows
		exportAttrString: 'class="c-editor-table"', //  Specify the attribute string attached to the table tag when outputting HTML
		withDropdown: true, //  Whether a drop-down menu pops up before inserting a table
	};

	BraftEditorGlobal.use(Table(tableOptions));

	const newControls: ControlType[] | undefined = controls
		? ([
				...(controls || [].filter((control: string) => control !== 'editHtml')),
				...(controls?.includes('editHtml')
					? [
							{
								key: 'editHtml',
								type: 'button',
								title: 'HTML',
								html: 'HTML',
								text: 'HTML',
								className: `html-edit-button ${isHtmlView ? 'active' : ''}`,
								onClick: () => {
									if (isHtmlView) {
										setRichTextEditorState(BraftEditorGlobal.createEditorState(prettyHtml || ''));
									}
									setIsHtmlView((prev) => !prev);
								},
								disabled: false,
							} as ExtendControlType,
						]
					: []),
			] as (ControlType | ExtendControlType)[])
		: undefined;

	return (
		<div
			className={clsx(root, className, getHiddenHeadingClasses(enabledHeadings), 'c-content', {
				disabled,
			})}
			id={id}
		>
			<BraftEditorGlobal
				{...braft}
				controls={newControls}
				id={id}
				language={getLanguage}
				media={media as unknown as MediaType}
				onBlur={() => onBlur?.()}
				onChange={(newEditorState: RichEditorState) => {
					setRichTextEditorState(newEditorState);
					const newhtml = newEditorState.toHTML();
					onChange?.(newhtml);
					setPrettyHtml(prettifyHtml(newhtml));
				}}
				onDelete={onDelete}
				onFocus={onFocus}
				onSave={() => richTextEditorState && onSave?.()}
				onTab={onTab}
				placeholder={placeholder}
				readOnly={disabled}
				value={richTextEditorState}
			/>
			{isHtmlView ? (
				<textarea
					ref={htmlEditRef}
					style={{
						top: `${toolbarHeight}px`,
					}}
					className={`${root}__html-view`}
					onBlur={() => {
						setRichTextEditorState(BraftEditorGlobal.createEditorState(prettyHtml || ''));
					}}
					onChange={(evt) => {
						setPrettyHtml(evt.target.value);
					}}
					value={prettyHtml}
				/>
			) : null}
		</div>
	);
};

export default RichTextEditorInternal;
