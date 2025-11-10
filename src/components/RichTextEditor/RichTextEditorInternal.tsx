import BraftEditor, {
	type EditorState,
	type ExtendControlType,
	type MediaType,
} from 'braft-editor';
import Table from 'braft-extensions/dist/table';
import clsx from 'clsx';
import { type FunctionComponent, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { getLanguage } from './RichTextEditor.consts.js';
import { getHiddenHeadingClasses, prettifyHtml } from './RichTextEditor.helpers.js';
import { ALL_RICH_TEXT_HEADINGS, type RichTextEditorProps } from './RichTextEditor.types.js';

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
	const [prettyHtml, setPrettyHtml] = useState('');
	const htmlEditRef = useRef<HTMLPreElement | null>(null);

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

	useEffect(() => {
		setHtml(state?.toHTML() || '');
		const formattedHtml = prettifyHtml(state?.toHTML());
		setPrettyHtml(formattedHtml);
	}, [state]);

	const tableOptions = {
		columnResizable: false, //  Whether to allow drag to adjust the column width, default false
		defaultColumns: 3, //  default number of columns
		defaultRows: 3, //  default number of rows
		exportAttrString: 'class="c-editor-table"', //  Specify the attribute string attached to the table tag when outputting HTML
		withDropdown: true, //  Whether a drop-down menu pops up before inserting a table
	};

	BraftEditor.default.use(Table(tableOptions));

	const newControls = controls
		? [
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
										onChange?.(BraftEditor.default.createEditorState(html || ''));
									}
									setIsHtmlView((prev) => !prev);
								},
								disabled: false,
							} as ExtendControlType,
						]
					: []),
			]
		: undefined;

	return (
		<div
			className={clsx(root, className, getHiddenHeadingClasses(enabledHeadings), 'c-content', {
				disabled,
			})}
			id={id}
		>
			<BraftEditor.default
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
				value={state || BraftEditor.default.createEditorState(initialHtml || '')}
			/>
			{isHtmlView ? (
				<pre
					ref={htmlEditRef}
					style={{
						top: `${toolbarHeight}px`,
						height: `calc(100% - ${toolbarHeight}px)`,
					}}
					className={`${root}__html-view`}
					onBlur={() => {
						onChange?.(BraftEditor.default.createEditorState(html || ''));
					}}
					contentEditable={true}
					onInput={() => {
						const html = htmlEditRef.current?.innerText;
						setHtml(html || '');
					}}
				>
					{prettyHtml}
				</pre>
			) : null}
		</div>
	);
};

export default RichTextEditorInternal;
