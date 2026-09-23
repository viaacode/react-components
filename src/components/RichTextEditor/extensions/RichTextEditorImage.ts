import { mergeAttributes } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import { NodeSelection, Plugin, PluginKey } from '@tiptap/pm/state';

export const RICH_TEXT_EDITOR_IMAGE_LINK_CLASS = 'c-editor-image-link';

/**
 * The anchor wrapping a linked image, when the given event target sits inside one.
 */
const getImageLink = (event: Event): HTMLAnchorElement | null =>
	(event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
		`a.${RICH_TEXT_EDITOR_IMAGE_LINK_CLASS}`
	) ?? null;

export enum RichTextEditorImageAlign {
	FLOAT_LEFT = 'float-left',
	FLOAT_RIGHT = 'float-right',
	BLOCK_LEFT = 'block-left',
	BLOCK_CENTER = 'block-center',
	BLOCK_RIGHT = 'block-right',
}

export const RICH_TEXT_EDITOR_IMAGE_ALIGNS: RichTextEditorImageAlign[] =
	Object.values(RichTextEditorImageAlign);

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		richTextEditorImage: {
			/**
			 * Align the currently selected image, controlling how the surrounding text reflows.
			 */
			setImageAlign: (align: RichTextEditorImageAlign | null) => ReturnType;
			/**
			 * Wrap the currently selected image in a link.
			 */
			setImageLink: (attributes: { href: string; target?: string | null }) => ReturnType;
			/**
			 * Remove the link around the currently selected image.
			 */
			unsetImageLink: () => ReturnType;
		};
	}
}

/**
 * The default image extension has no notion of alignment. We add an `align` attribute,
 * serialised as `data-align`, so it stays readable in the html view and round trips
 * through setContent / getHTML. The actual positioning is done in RichTextEditor.scss.
 *
 * An image is a block node, so it cannot carry the link mark the way text does. Instead we
 * store the link on the node itself (`href` / `target`) and render a wrapping anchor. The
 * alignment moves to that anchor as well, since it is then the element that participates in
 * the surrounding layout.
 */
export const RichTextEditorImage = Image.extend({
	// Higher than the link extension (1000), so our click handler below runs before the one
	// that opens a link's url.
	priority: 1001,

	addAttributes() {
		return {
			...this.parent?.(),
			align: {
				default: null,
				parseHTML: (element) =>
					element.getAttribute('data-align') ??
					element.parentElement?.closest('a')?.getAttribute('data-align'),
				renderHTML: (attributes) => (attributes.align ? { 'data-align': attributes.align } : {}),
			},
			href: {
				default: null,
				parseHTML: (element) => element.parentElement?.closest('a')?.getAttribute('href'),
				// Rendered on the wrapping anchor instead, see renderHTML
				renderHTML: () => ({}),
			},
			target: {
				default: null,
				parseHTML: (element) => element.parentElement?.closest('a')?.getAttribute('target'),
				renderHTML: () => ({}),
			},
		};
	},

	renderHTML({ HTMLAttributes, node }) {
		const { href, target, align } = node.attrs;

		if (!href) {
			return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
		}

		// The anchor takes over the alignment, so the image itself stays a plain inline image
		const { 'data-align': _align, ...imageAttributes } = HTMLAttributes;

		return [
			'a',
			{
				href,
				...(target ? { target } : {}),
				...(target === '_blank' ? { rel: 'noopener noreferrer' } : {}),
				...(align ? { 'data-align': align } : {}),
				class: RICH_TEXT_EDITOR_IMAGE_LINK_CLASS,
			},
			['img', mergeAttributes(this.options.HTMLAttributes, imageAttributes)],
		];
	},

	addCommands() {
		return {
			...this.parent?.(),
			setImageAlign:
				(align) =>
				({ commands }) =>
					commands.updateAttributes(this.name, { align }),
			setImageLink:
				({ href, target }) =>
				({ commands }) =>
					commands.updateAttributes(this.name, { href, target: target ?? null }),
			unsetImageLink:
				() =>
				({ commands }) =>
					commands.updateAttributes(this.name, { href: null, target: null }),
		};
	},

	addProseMirrorPlugins() {
		const nodeName = this.name;

		return [
			...(this.parent?.() || []),
			new Plugin({
				key: new PluginKey('richTextEditorImageClick'),
				props: {
					/**
					 * Other links in the editor are made inert with pointer-events, which is not an
					 * option for a linked image: we need the click to select the image. So stop the
					 * browser from navigating ourselves. These handlers are bound to the editor's own
					 * dom node, so this only ever applies inside the editor, never to the same markup
					 * rendered elsewhere. handleClick is not enough: it receives the mouseup event,
					 * while the navigation is the default action of the click that follows it.
					 */
					handleDOMEvents: {
						click: (_view, event) => {
							if (getImageLink(event)) {
								event.preventDefault();
							}
							// Never handled: the selection is made in handleClick below
							return false;
						},
						// Middle click, which would open the link in a new tab
						auxclick: (_view, event) => {
							if (getImageLink(event)) {
								event.preventDefault();
							}
							return false;
						},
					},

					/**
					 * A linked image is wrapped in an anchor, which the link extension would otherwise
					 * treat as a regular link. Select the image instead, so it stays editable
					 * (alignment, link, delete).
					 */
					handleClick: (view, _pos, event) => {
						const anchor = getImageLink(event);
						const parent = anchor?.parentNode;

						if (!anchor || !parent) {
							return false;
						}

						// The position reported for the click is unreliable for a floated image, since
						// those coordinates also map onto the text it floats next to. Resolve the
						// position of the anchor itself instead.
						const nodePos = view.posAtDOM(
							parent,
							Array.prototype.indexOf.call(parent.childNodes, anchor)
						);
						const { doc, tr } = view.state;

						if (doc.nodeAt(nodePos)?.type.name !== nodeName) {
							return false;
						}

						view.dispatch(tr.setSelection(NodeSelection.create(doc, nodePos)));
						return true;
					},
				},
			}),
		];
	},
});
