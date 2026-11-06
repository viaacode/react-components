import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Editor } from '@tiptap/core';
import {
	RICH_TEXT_EDITOR_IMAGE_ALIGNS,
	RICH_TEXT_EDITOR_IMAGE_LINK_CLASS,
} from './extensions/RichTextEditorImage';
import RichTextEditorInternal from './RichTextEditorInternal';

const IMAGE_SRC = 'https://assets.hetarchief.be/avo2/CONTENT_BLOCK_IMAGE/image.webp';
const LINK_HREF = 'https://onderwijs.hetarchief.be';

const renderEditor = async (value: string) => {
	const onChange = jest.fn();
	const { container } = render(
		<RichTextEditorInternal value={value} onChange={onChange} controls={['bold', 'link']} />
	);
	await waitFor(() => expect(container.querySelector('.ProseMirror')).toBeTruthy());

	// tiptap exposes the editor on its dom node
	const editor = (container.querySelector('.ProseMirror') as HTMLElement & { editor: Editor })
		.editor;
	const getOutput = (): string => onChange.mock.calls.at(-1)?.[0] ?? editor.getHTML();

	return { editor, getOutput };
};

const selectImage = (editor: Editor) => {
	let imagePos = -1;
	editor.state.doc.descendants((node, pos) => {
		if (node.type.name === 'image') {
			imagePos = pos;
		}
	});
	act(() => {
		editor.commands.setNodeSelection(imagePos);
	});
};

describe('RichTextEditor - image bubble menu', () => {
	it('Should add a link that opens in a new window to an aligned image, keeping its alignment', async () => {
		const { editor, getOutput } = await renderEditor(
			`<p>Intro</p><img class="c-editor-image" src="${IMAGE_SRC}" data-align="block-center"><p>Outro</p>`
		);
		selectImage(editor);

		fireEvent.click(await screen.findByTitle('Link achter afbeelding'));
		fireEvent.change(screen.getByPlaceholderText('Link URL invoeren'), {
			target: { value: LINK_HREF },
		});
		fireEvent.click(screen.getByRole('switch', { name: 'Openen in een nieuw venster' }));
		fireEvent.click(screen.getByText('Bevestig'));

		expect(getOutput()).toEqual(
			`<p>Intro</p><a href="${LINK_HREF}" target="_blank" rel="noopener noreferrer" data-align="block-center" class="${RICH_TEXT_EDITOR_IMAGE_LINK_CLASS}"><img class="c-editor-image" src="${IMAGE_SRC}"></a><p>Outro</p>`
		);
	});

	it('Should prefill and remove the link of a linked image', async () => {
		const { editor, getOutput } = await renderEditor(
			`<a href="${LINK_HREF}" target="_blank" rel="noopener noreferrer" data-align="float-left" class="${RICH_TEXT_EDITOR_IMAGE_LINK_CLASS}"><img class="c-editor-image" src="${IMAGE_SRC}"></a><p>Text</p>`
		);
		selectImage(editor);

		fireEvent.click(await screen.findByTitle('Link achter afbeelding'));
		expect(screen.getByPlaceholderText('Link URL invoeren')).toHaveValue(LINK_HREF);
		expect(screen.getByRole('switch', { name: 'Openen in een nieuw venster' })).toHaveAttribute(
			'aria-checked',
			'true'
		);

		fireEvent.click(screen.getByText('Verwijder link'));

		expect(getOutput()).toEqual(
			`<img class="c-editor-image" src="${IMAGE_SRC}" data-align="float-left"><p>Text</p>`
		);
	});

	it('Should set the size of a linked image, keeping its link and alignment', async () => {
		const { editor, getOutput } = await renderEditor(
			`<a href="${LINK_HREF}" data-align="block-right" class="${RICH_TEXT_EDITOR_IMAGE_LINK_CLASS}"><img class="c-editor-image" src="${IMAGE_SRC}"></a><p>Text</p>`
		);
		selectImage(editor);

		fireEvent.click(await screen.findByTitle('Grootte afbeelding'));
		fireEvent.change(screen.getByLabelText('Breedte'), { target: { value: '300' } });
		fireEvent.change(screen.getByLabelText('Hoogte'), { target: { value: '200px' } });
		fireEvent.click(screen.getByText('Bevestig'));

		expect(getOutput()).toEqual(
			`<a href="${LINK_HREF}" data-align="block-right" class="${RICH_TEXT_EDITOR_IMAGE_LINK_CLASS}"><img class="c-editor-image" src="${IMAGE_SRC}" width="300" height="200"></a><p>Text</p>`
		);

		fireEvent.click(screen.getByTitle('Grootte afbeelding'));
		expect(screen.getByLabelText('Breedte')).toHaveValue('300');
		fireEvent.click(screen.getByText('Originele grootte'));

		expect(getOutput()).toEqual(
			`<a href="${LINK_HREF}" data-align="block-right" class="${RICH_TEXT_EDITOR_IMAGE_LINK_CLASS}"><img class="c-editor-image" src="${IMAGE_SRC}"></a><p>Text</p>`
		);
	});
});

/**
 * AVO-4153: a centered image in a text column jumped to the left when it got a link through the
 * link button in the toolbar, while it was selected. The alignment has to stay on the anchor that
 * wraps the image, since that anchor is the element taking part in the layout.
 */
describe('RichTextEditor - toolbar link on an aligned image', () => {
	it.each(RICH_TEXT_EDITOR_IMAGE_ALIGNS)(
		'Should keep the %s alignment of a selected image when it gets a link from the toolbar',
		async (align) => {
			const { editor, getOutput } = await renderEditor(
				`<p>Intro</p><img class="c-editor-image" src="${IMAGE_SRC}" data-align="${align}"><p>Outro</p>`
			);
			selectImage(editor);

			fireEvent.click(screen.getByTitle('Link invoegen'));
			fireEvent.change(await screen.findByPlaceholderText('Link URL invoeren'), {
				target: { value: LINK_HREF },
			});
			fireEvent.click(screen.getByText('Bevestig'));

			const expectedHtml = `<p>Intro</p><a href="${LINK_HREF}" target="_self" data-align="${align}" class="${RICH_TEXT_EDITOR_IMAGE_LINK_CLASS}"><img class="c-editor-image" src="${IMAGE_SRC}"></a><p>Outro</p>`;
			expect(getOutput()).toEqual(expectedHtml);
			// The image stays selected and keeps its alignment in the editor itself as well
			expect(editor.isActive('image', { align, href: LINK_HREF })).toBe(true);
			expect(
				document.querySelector(`.ProseMirror a.${RICH_TEXT_EDITOR_IMAGE_LINK_CLASS}`)
			).toHaveAttribute('data-align', align);
		}
	);

	it('Should keep the alignment of an image when its link is removed with the toolbar unlink button', async () => {
		const { editor, getOutput } = await renderEditor(
			`<a href="${LINK_HREF}" data-align="block-center" class="${RICH_TEXT_EDITOR_IMAGE_LINK_CLASS}"><img class="c-editor-image" src="${IMAGE_SRC}"></a><p>Text</p>`
		);
		selectImage(editor);

		fireEvent.click(screen.getByTitle('Link verwijderen'));

		expect(getOutput()).toEqual(
			`<img class="c-editor-image" src="${IMAGE_SRC}" data-align="block-center"><p>Text</p>`
		);
	});
});
