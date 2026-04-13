import clsx from 'clsx';
import QuillTableBetter from 'quill-table-better';
import { type FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import { setupQuill } from './quill-setup';
import { buildQuillToolbar } from './RichTextEditor.consts';
import { getHiddenHeadingClasses, prettifyHtml } from './RichTextEditor.helpers';
import { ALL_RICH_TEXT_HEADINGS, type RichTextEditorProps } from './RichTextEditor.types';

import './RichTextEditor.scss';

setupQuill();

const RichTextEditorInternal: FunctionComponent<RichTextEditorProps> = ({
	quill: quillOverrides,
	className,
	controls,
	disabled,
	id,
	initialHtml,
	onBlur,
	onChange,
	onFocus,
	onSave,
	placeholder,
	enabledHeadings = ALL_RICH_TEXT_HEADINGS,
	rootClassName: root = 'c-rich-text-editor',
	state,
}) => {
	console.log(initialHtml);
	const [isHtmlView, setIsHtmlView] = useState(false);
	const [toolbarHeight, setToolbarHeight] = useState(0);
	const [prettyHtml, setPrettyHtml] = useState(prettifyHtml(state?.toHTML() ?? initialHtml ?? ''));
	const quillRef = useRef<ReactQuill>(null);
	const htmlEditRef = useRef<HTMLPreElement | null>(null);
	const htmlScratchRef = useRef<string>('');

	const safeGetEditor = useCallback(() => {
		try {
			return quillRef.current?.getEditor() ?? null;
		} catch {
			return null;
		}
	}, []);

	// Sync editor content when external state is programmatically changed from outside.
	// Skip when state is null/undefined — defaultValue already handled initialization.
	// Skip when the HTML already matches what Quill has — breaks the onChange feedback loop.
	useEffect(() => {
		if (!state) return;
		const html = state.toHTML();
		if (html === htmlScratchRef.current) return;
		const editor = safeGetEditor();
		if (editor) {
			editor.clipboard.dangerouslyPasteHTML(html);
		}
		htmlScratchRef.current = html;
		setPrettyHtml(prettifyHtml(html));
	}, [state, safeGetEditor]);

	// When there is no external state, load initialHtml after mount so that
	// quill-table-better is fully initialized before we paste the HTML.
	// (defaultValue is processed at Quill creation, before the table module is ready.)
	const initializedRef = useRef(false);
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs once on mount only
	useEffect(() => {
		if (state || initializedRef.current) return;
		const html = initialHtml ?? '';
		if (!html) return;
		initializedRef.current = true;

		// quill-table-better README: "setContents causes the table to not display
		// properly, replace with updateContents". dangerouslyPasteHTML uses setContents
		// internally, so we must use clipboard.convert() + updateContents instead.
		// We retry via rAF until the editor ref is available.
		const tryPaste = () => {
			const editor = safeGetEditor();
			if (editor) {
				const delta = editor.clipboard.convert({ html, text: '' });
				editor.updateContents(delta, 'api');
				editor.setSelection(null as any, 'silent');
				htmlScratchRef.current = html;
			} else {
				requestAnimationFrame(tryPaste);
			}
		};
		requestAnimationFrame(tryPaste);
	}, []);

	// Read toolbar height once the editor mounts
	useEffect(() => {
		const toolbar = document.querySelector('.ql-toolbar');
		if (!toolbar) return;
		setToolbarHeight(toolbar.getBoundingClientRect().height);
	}, []);

	const handleQuillChange = useCallback(
		(html: string, _delta: unknown, source: string) => {
			// Ignore 'api' and 'silent' events fired by quill-table-up's internal
			// layout/normalization passes — only propagate genuine user edits.
			if (source !== 'user') return;
			htmlScratchRef.current = html;
			onChange?.({ toHTML: () => html });
		},
		[onChange]
	);

	const handleSave = useCallback(() => {
		if (state) onSave?.();
	}, [state, onSave]);

	// Build modules config — memoized so the object reference is stable across renders.
	// ReactQuill treats `modules` as a "dirty prop": any reference change tears down and
	// re-creates the entire Quill instance, which loses focus and clears content.
	const hasTable = controls?.includes('table');
	const hasEmoji = controls?.includes('emoji');
	const modules = useMemo<Record<string, unknown>>(
		() => ({
			toolbar: controls
				? {
						container: buildQuillToolbar(controls),
						handlers: {
							divider() {
								const editor = safeGetEditor();
								if (!editor) return;
								const range = editor.getSelection(true);
								editor.insertEmbed(range.index, 'divider', true, 'user');
								editor.setSelection(range.index + 1, 0, 'silent');
							},
							fullscreen() {
								const wrapper = document.getElementById(id ?? '');
								wrapper?.classList.toggle(`${root}--fullscreen`);
							},
							editHtml() {
								setIsHtmlView((prev) => {
									const next = !prev;
									if (!next) {
										// Exiting HTML view — flush scratch HTML back into editor
										const editor = safeGetEditor();
										if (editor) {
											editor.clipboard.dangerouslyPasteHTML(htmlScratchRef.current ?? '');
										}
									}
									return next;
								});
							},
						},
					}
				: false,
			history: { delay: 1000, maxStack: 100, userOnly: true },
			...(hasTable
				? {
						table: false,
						'table-better': {
							language: 'en_US',
							menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'delete'],
							toolbarTable: true,
						},
						keyboard: { bindings: QuillTableBetter.keyboardBindings },
					}
				: {}),
			...(hasEmoji ? { 'emoji-toolbar': true } : {}),
		}),
		[controls, hasTable, hasEmoji, id, root, safeGetEditor]
	);

	return (
		<div
			className={clsx(root, className, getHiddenHeadingClasses(enabledHeadings), 'c-content', {
				disabled,
				[`${root}--html-view`]: isHtmlView,
			})}
			id={id}
		>
			<ReactQuill
				{...quillOverrides}
				ref={quillRef}
				theme="snow"
				defaultValue={state ? state.toHTML() : initialHtml}
				placeholder={placeholder}
				readOnly={disabled}
				modules={modules}
				onBlur={() => {
					onBlur?.();
					handleSave();
				}}
				onChange={handleQuillChange}
				onFocus={() => onFocus?.()}
				formats={undefined} // allow all formats
			/>
			{isHtmlView ? (
				<pre
					ref={htmlEditRef}
					style={{
						top: `${toolbarHeight}px`,
						height: `calc(100% - ${toolbarHeight}px)`,
					}}
					className={`${root}__html-view`}
					contentEditable={true}
					suppressContentEditableWarning={true}
					onInput={() => {
						htmlScratchRef.current = htmlEditRef.current?.innerText ?? '';
					}}
				>
					{prettyHtml}
				</pre>
			) : null}
		</div>
	);
};

export default RichTextEditorInternal;
