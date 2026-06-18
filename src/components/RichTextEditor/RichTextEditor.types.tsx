import type { ReactNode } from 'react';

export interface CustomRichTextEditorButton {
	type: 'customButton';
	component: ReactNode;
}

export type RichTextEditorControl =
	| 'font-size'
	| 'font-family'
	| 'line-height'
	| 'letter-spacing'
	| 'text-color'
	| 'bold'
	| 'italic'
	| 'underline'
	| 'strike-through'
	| 'superscript'
	| 'subscript'
	| 'remove-styles'
	| 'emoji'
	| 'text-align'
	| 'text-indent'
	| 'link'
	| 'unlink'
	| 'headings'
	| 'list-ul'
	| 'list-ol'
	| 'blockquote'
	| 'code'
	| 'hr'
	| 'media'
	| 'clear'
	| 'undo'
	| 'redo'
	| 'table'
	| 'fullscreen'
	| 'separator'
	| 'editHtml'
	| CustomRichTextEditorButton;

export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal';

export const ALL_RICH_TEXT_HEADINGS: Heading[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'normal'];

export interface RichTextEditorProps {
	children?: ReactNode;
	className?: string;
	rootClassName?: string;
	id?: string;
	value?: string;
	placeholder?: string;
	controls?: RichTextEditorControl[];
	disabled?: boolean;
	media?: RichTextEditorMedia;
	onFocus?: () => void;
	onBlur?: () => void;
	onChange?: (html: string) => void;
	onTab?: () => void;
	onDelete?: () => void;
	onSave?: () => void;
	enabledHeadings?: Heading[];
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
