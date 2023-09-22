import { BraftEditorProps } from 'braft-editor';

export type RichTextEditorControl =
	| 'font-size' // Text size selector
	| 'font-family' // Text font selector
	| 'line-height' // Text line height selector
	| 'letter-spacing' // Text pitch selector
	| 'text-color' // Text color selector, including text background color settings
	| 'bold' // Set text bold
	| 'italic' // Italicize text
	| 'underline' // Underline text
	| 'strike-through' // Set Strikethrough
	| 'superscript' // Set text as superscript
	| 'subscript' // Set text as subscript
	| 'remove-styles' // Clear text style
	| 'emoji' // Emoji emoticon selector
	| 'text-align' // Text alignment tool, you can use the textAligns property to specify which alignment can be used
	| 'text-indent' // Paragraph indent tool, indent up to 6 levels
	| 'link' // Link insertion tool
	| 'headings' // Paragraph type (Title 1-6, General)
	| 'list-ul' // Unordered list
	| 'list-ol' // Ordered list
	| 'blockquote' // Quoted paragraph
	| 'code' // Code block
	| 'hr' // Horizontal line tool
	| 'media' // Multimedia insertion tool
	| 'clear' // Content removal tool
	| 'undo' // Undo operation
	| 'redo' // Redo operation
	| 'table' // Table
	| 'fullscreen' // Make editor fullscreen
	| 'separator'; // Split line, continuous multiple separators will only be displayed as 1

export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal';

export const ALL_RICH_TEXT_HEADINGS: Heading[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'normal'];

export interface RichTextEditorProps {
	children?: React.ReactNode;
	className?: string;
	rootClassName?: string;
	id?: string;
	initialHtml?: string;
	state?: RichEditorState;
	placeholder?: string;
	controls?: RichTextEditorControl[];
	disabled?: boolean;
	media?: RichTextEditorMedia;
	onFocus?: () => void;
	onBlur?: () => void;
	onChange?: (editorState: RichEditorState) => void;
	onTab?: () => void;
	onDelete?: () => void;
	onSave?: () => void;
	enabledHeadings?: Heading[];
	braft?: Partial<BraftEditorProps>; // TODO: remove 1:1 mapped properties above
}

export interface RichEditorState {
	toHTML: () => string;
}

export interface RichTextEditorUploadInfo {
	file: File;
	progress: (progress: number) => void;
	libraryId: string;
	success: (res: { url: string; meta?: any }) => void;
	error: (err: Error) => void;
}

export interface RichTextEditorMedia {
	uploadFn: (uploadInfo: RichTextEditorUploadInfo) => void;
	validateFn?: (file: File) => boolean | Promise<boolean>;
	/**
	 * defaults to:
	 *  {
	 *  	image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
	 *		video: 'video/mp4',
	 *		audio : 'audio / mp3'
	 *	}
	 */
	accepts?: { [type: string]: string };
}
