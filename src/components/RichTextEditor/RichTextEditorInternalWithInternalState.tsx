import clsx from 'clsx';
import QuillTableBetter from 'quill-table-better';
import { type FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import { setupQuill } from './quill-setup';
import { buildQuillToolbar } from './RichTextEditor.consts';
import { getHiddenHeadingClasses, prettifyHtml } from './RichTextEditor.helpers';
import {
	ALL_RICH_TEXT_HEADINGS,
	type RichTextEditorWithInternalStateProps,
} from './RichTextEditor.types';

import './RichTextEditor.scss';

setupQuill();

const RichTextEditorInternalWithInternalState: FunctionComponent<
	RichTextEditorWithInternalStateProps
> = ({
	quill: quillOverrides,
	className,
	controls,
	disabled,
	id,
	value,
	onBlur,
	onChange,
	onFocus,
	onSave,
	placeholder,
	enabledHeadings = ALL_RICH_TEXT_HEADINGS,
	rootClassName: root = 'c-rich-text-editor',
}) => {
	const [isHtmlView, setIsHtmlView] = useState(false);
	const [toolbarHeight, setToolbarHeight] = useState(0);
	const [prettyHtml, setPrettyHtml] = useState(prettifyHtml(value ?? ''));
	const quillRef = useRef<ReactQuill>(null);
	const htmlEditRef = useRef<HTMLTextAreaElement | null>(null);
	// Tracks current Quill content without making it a controlled prop
	const currentHtmlRef = useRef<string>(value ?? '');

	const safeGetEditor = useCallback(() => {
		try {
			return quillRef.current?.getEditor() ?? null;
		} catch {
			return null;
		}
	}, []);

	// Read toolbar height once the editor mounts
	useEffect(() => {
		const toolbar = document.querySelector('.ql-toolbar');
		if (!toolbar) return;
		setToolbarHeight(toolbar.getBoundingClientRect().height);
	}, []);

	// Load the initial value after mount using rAF so quill-table-better's clipboard
	// matchers are registered before we paste. defaultValue is processed at Quill
	// construction time (before the table module is ready) so tables would be stripped.
	const initializedRef = useRef(false);
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs once on mount only
	useEffect(() => {
		if (initializedRef.current) return;
		const html = value ?? '';
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
				currentHtmlRef.current = html;
			} else {
				requestAnimationFrame(tryPaste);
			}
		};
		requestAnimationFrame(tryPaste);
	}, []);

	// Sync editor when value prop changes externally (e.g. parent resets content).
	// Skip when it matches what Quill already has to avoid clobbering focus/selection.
	useEffect(() => {
		if (!initializedRef.current) return; // still in initial rAF — skip
		const newHtml = value ?? '';
		if (newHtml === currentHtmlRef.current) return;
		const editor = safeGetEditor();
		if (editor) {
			const delta = editor.clipboard.convert({ html: newHtml, text: '' });
			editor.setContents(delta, 'api');
		}
		currentHtmlRef.current = newHtml;
		setPrettyHtml(prettifyHtml(newHtml));
	}, [value, safeGetEditor]);

	const handleQuillChange = useCallback(
		(newHtml: string, _delta: unknown, source: string) => {
			// Ignore 'api' and 'silent' events fired by quill-table-up's internal
			// layout/normalization passes — only propagate genuine user edits.
			if (source !== 'user') return;
			currentHtmlRef.current = newHtml;
			onChange?.(newHtml);
		},
		[onChange]
	);

	const handleSave = useCallback(() => {
		if (currentHtmlRef.current) onSave?.();
	}, [onSave]);

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
							undo() {
								safeGetEditor()?.history.undo();
							},
							redo() {
								safeGetEditor()?.history.redo();
							},
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
											editor.clipboard.dangerouslyPasteHTML(currentHtmlRef.current ?? '');
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
				defaultValue=""
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
				<textarea
					ref={htmlEditRef}
					style={{
						top: `${toolbarHeight}px`,
						height: `calc(100% - ${toolbarHeight}px)`,
					}}
					className={`${root}__html-view`}
					defaultValue={prettyHtml}
					onInput={(e) => {
						currentHtmlRef.current = e.currentTarget.value ?? '';
					}}
				/>
			) : null}
		</div>
	);
};

export default RichTextEditorInternalWithInternalState;
