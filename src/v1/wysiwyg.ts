import {
	RichEditorStateSchema,
	WYSIWYGControlSchema,
	WYSIWYGMediaSchema,
	WYSIWYGPropsSchema,
	WYSIWYGUploadInfoSchema,
} from './components/WYSIWYG/WYSIWYG.types';

export { WYSIWYG } from './components/WYSIWYG/WYSIWYG';
export type WYSIWYGProps = WYSIWYGPropsSchema;
export type WYSIWYGControl = WYSIWYGControlSchema;
export type RichEditorState = RichEditorStateSchema;
export type WYSIWYGMedia = WYSIWYGMediaSchema;
export type WYSIWYGUploadInfo = WYSIWYGUploadInfoSchema;
