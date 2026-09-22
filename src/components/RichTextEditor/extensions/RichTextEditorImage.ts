import Image from '@tiptap/extension-image';

export type RichTextEditorImageAlign =
	| 'float-left'
	| 'float-right'
	| 'block-left'
	| 'block-center'
	| 'block-right';

export const RICH_TEXT_EDITOR_IMAGE_ALIGNS: RichTextEditorImageAlign[] = [
	'float-left',
	'float-right',
	'block-left',
	'block-center',
	'block-right',
];

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		richTextEditorImage: {
			/**
			 * Align the currently selected image, controlling how the surrounding text reflows.
			 */
			setImageAlign: (align: RichTextEditorImageAlign | null) => ReturnType;
		};
	}
}

/**
 * The default image extension has no notion of alignment. We add an `align` attribute,
 * serialised as `data-align`, so it stays readable in the html view and round trips
 * through setContent / getHTML. The actual positioning is done in RichTextEditor.scss.
 */
export const RichTextEditorImage = Image.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			align: {
				default: null,
				parseHTML: (element) => element.getAttribute('data-align'),
				renderHTML: (attributes) =>
					attributes.align ? { 'data-align': attributes.align } : {},
			},
		};
	},

	addCommands() {
		return {
			...this.parent?.(),
			setImageAlign:
				(align) =>
				({ commands }) =>
					commands.updateAttributes(this.name, { align }),
		};
	},
});
