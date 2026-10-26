import type { Extensions } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditorImage } from './extensions/RichTextEditorImage';

/**
 * The extensions, and so the schema, of the rich text editor. Shared with the tests, so they
 * parse html exactly the way the editor does when it loads stored content.
 */
export const getRichTextEditorExtensions = (placeholder?: string): Extensions => [
	StarterKit, // Already includes link and underline functionality
	RichTextEditorImage.configure({ HTMLAttributes: { class: 'c-editor-image' } }),
	Table.configure({
		resizable: false,
		HTMLAttributes: { class: 'c-editor-table' },
	}),
	TableRow,
	TableCell,
	TableHeader,
	Subscript,
	Superscript,
	TextAlign.configure({ types: ['heading', 'paragraph'] }),
	TextStyle,
	Placeholder.configure({ placeholder }),
];
