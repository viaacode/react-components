import { Editor } from '@tiptap/core';
import { RICH_TEXT_EDITOR_IMAGE_LINK_CLASS } from './extensions/RichTextEditorImage';
import { getRichTextEditorExtensions } from './RichTextEditor.extensions';

/**
 * Content saved with the previous editor (Braft) is loaded as is into the tiptap editor. When the
 * editor is saved, its output replaces the stored html, so any link the parser drops is gone for
 * good (ARC-4135). The fixtures below are variations of linked images found in the AVO content.
 */

const IMAGE_SRC =
	'https://assets.hetarchief.be/avo2/CONTENT_BLOCK_IMAGE/mock-up-brainstormgids.webp';
const PDF_HREF = 'https://assets.hetarchief.be/avo2/CONTENT_BLOCK_FILE/brainstormgids.pdf';

const loadIntoEditor = (html: string): string => {
	const editor = new Editor({ extensions: getRichTextEditorExtensions(), content: html });
	const output = editor.getHTML();
	editor.destroy();
	return output;
};

const parseHtml = (html: string): HTMLElement =>
	new DOMParser().parseFromString(html, 'text/html').body;

interface ImageLink {
	src: string | null;
	href: string | null;
	target: string | null;
}

const getImageLinks = (html: string): ImageLink[] =>
	Array.from(parseHtml(html).querySelectorAll('img')).map((image) => {
		const link = image.closest('a');
		return {
			src: image.getAttribute('src'),
			href: link?.getAttribute('href') ?? null,
			target: link?.getAttribute('target') || null,
		};
	});

describe('RichTextEditor - legacy Braft content', () => {
	it('Should convert a linked Braft image to the tiptap image link format', () => {
		const braftHtml = `<p></p>
<div class="media-wrap image-wrap"><a style="display:inline-block" href="${PDF_HREF}" target="_blank"><img src="${IMAGE_SRC}" /></a></div>
<p></p>`;

		expect(loadIntoEditor(braftHtml)).toEqual(
			`<p></p><a href="${PDF_HREF}" target="_blank" rel="noopener noreferrer" class="${RICH_TEXT_EDITOR_IMAGE_LINK_CLASS}"><img class="c-editor-image" src="${IMAGE_SRC}"></a><p></p>`
		);
	});

	it.each([
		{
			name: 'a link without target',
			html: `<div class="media-wrap image-wrap"><a style="display:inline-block" href="${PDF_HREF}"><img class="media-wrap image-wrap" src="${IMAGE_SRC}"/></a></div>`,
		},
		{
			name: 'an empty target',
			html: `<div class="media-wrap image-wrap"><a style="display:inline-block" href="${PDF_HREF}" target=""><img src="${IMAGE_SRC}"/></a></div>`,
		},
		{
			name: 'the target before the href',
			html: `<div class="media-wrap image-wrap"><a target="_blank" href="${PDF_HREF}" style="display:inline-block"><img src="${IMAGE_SRC}" class="media-wrap image-wrap"></a></div>`,
		},
		{
			name: 'a relative link',
			html: `<div class="media-wrap image-wrap"><a style="display:inline-block" href="/workshops-en-events/opnames-webinars"><img src="${IMAGE_SRC}"/></a></div>`,
		},
		{
			name: 'a link with an escaped query string',
			html: `<div class="media-wrap image-wrap"><a style="display:inline-block" href="/zoeken?filters=%7B%22query%22%3A%22erfgoeddag%22%7D&amp;page=1" target=""><img src="${IMAGE_SRC}"/></a></div>`,
		},
		{
			name: 'a mailto link',
			html: `<div class="media-wrap image-wrap"><a style="display:inline-block" href="mailto:vragen@onderwijs.hetarchief.be" target="_blank"><img src="${IMAGE_SRC}"/></a></div>`,
		},
		{
			name: 'a sized image',
			html: `<div class="media-wrap image-wrap"><a style="display:inline-block" href="${PDF_HREF}" target="_blank"><img class="media-wrap image-wrap" src="${IMAGE_SRC}" width="291px" height="211px" style="width:291px;height:211px"/></a></div>`,
		},
		{
			name: 'a centered image',
			html: `<div class="media-wrap image-wrap align-center" style="text-align:center"><a style="display:inline-block" href="${PDF_HREF}" target="_blank"><img class="media-wrap image-wrap align-center" src="${IMAGE_SRC}"/></a></div>`,
		},
		{
			name: 'a floated image',
			html: `<div class="media-wrap image-wrap float-right" style="float:right"><a style="display:inline-block" href="${PDF_HREF}"><img class="media-wrap image-wrap float-right" src="${IMAGE_SRC}" height="250px" style="height:250px"/></a></div>`,
		},
		{
			name: 'an image without media wrapper',
			html: `<p>Intro</p><a href="${PDF_HREF}" target="_blank"><img src="${IMAGE_SRC}"></a>`,
		},
	])('Should keep the link of a Braft image with $name', ({ html }) => {
		const imageLinks = getImageLinks(html);

		expect(imageLinks).toHaveLength(1);
		expect(imageLinks[0].href).not.toBeNull();
		expect(getImageLinks(loadIntoEditor(html))).toEqual(imageLinks);
	});

	it('Should keep every image and its link in a block with several images', () => {
		const html = `<p>Kies je pakket:</p>
<div class="media-wrap image-wrap"><a style="display:inline-block" href="/dewarmsteweek" target="_blank"><img src="https://assets.hetarchief.be/avo2/1.webp"/></a></div>
<p></p>
<div class="media-wrap image-wrap"><img src="https://assets.hetarchief.be/avo2/2.webp"/></div>
<p></p>
<div class="media-wrap image-wrap"><a style="display:inline-block" href="/dewarmsteweek/leerlingen"><img src="https://assets.hetarchief.be/avo2/3.webp"/></a></div>`;

		expect(getImageLinks(loadIntoEditor(html))).toEqual([
			{ src: 'https://assets.hetarchief.be/avo2/1.webp', href: '/dewarmsteweek', target: '_blank' },
			{ src: 'https://assets.hetarchief.be/avo2/2.webp', href: null, target: null },
			{
				src: 'https://assets.hetarchief.be/avo2/3.webp',
				href: '/dewarmsteweek/leerlingen',
				target: null,
			},
		]);
	});

	it('Should keep text links next to a linked image', () => {
		const html = `<p>Lees de <a href="https://onderwijs.hetarchief.be/nieuws" target="_blank">nieuwsbrief</a>.</p>
<div class="media-wrap image-wrap"><a style="display:inline-block" href="${PDF_HREF}"><img src="${IMAGE_SRC}"/></a></div>`;

		const textLinks = Array.from(parseHtml(loadIntoEditor(html)).querySelectorAll('p a')).map(
			(link) => link.getAttribute('href')
		);

		expect(textLinks).toEqual(['https://onderwijs.hetarchief.be/nieuws']);
	});

	it('Should leave converted content unchanged when it is loaded again', () => {
		const braftHtml = `<div class="media-wrap image-wrap"><a style="display:inline-block" href="${PDF_HREF}" target="_blank"><img src="${IMAGE_SRC}"/></a></div>`;
		const tiptapHtml = loadIntoEditor(braftHtml);

		expect(loadIntoEditor(tiptapHtml)).toEqual(tiptapHtml);
	});
});
