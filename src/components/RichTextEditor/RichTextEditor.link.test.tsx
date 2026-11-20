import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Editor } from '@tiptap/core';
import RichTextEditorInternal from './RichTextEditorInternal';

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

const selectText = (editor: Editor, text: string) => {
	let from = -1;
	editor.state.doc.descendants((node, pos) => {
		if (node.isText && node.text?.includes(text)) {
			from = pos + (node.text?.indexOf(text) ?? 0);
		}
	});
	act(() => {
		editor.commands.setTextSelection({ from, to: from + text.length });
	});
};

const getSwitch = () => screen.getByRole('switch', { name: 'Openen in een nieuw venster' });

describe('RichTextEditor - link popup', () => {
	it('Should save a new link that opens in the same window', async () => {
		const { editor, getOutput } = await renderEditor('<p>Hello world</p>');
		selectText(editor, 'world');

		fireEvent.click(screen.getByTitle('Link invoegen'));
		fireEvent.change(screen.getByPlaceholderText('Link URL invoeren'), {
			target: { value: LINK_HREF },
		});
		expect(getSwitch().getAttribute('aria-checked')).toEqual('false');
		fireEvent.click(screen.getByText('Bevestig'));

		expect(getOutput()).toContain(`<a target="_self"`);
		expect(getOutput()).not.toContain('_blank');
	});

	it('Should save a new link that opens in a new window', async () => {
		const { editor, getOutput } = await renderEditor('<p>Hello world</p>');
		selectText(editor, 'world');

		fireEvent.click(screen.getByTitle('Link invoegen'));
		fireEvent.change(screen.getByPlaceholderText('Link URL invoeren'), {
			target: { value: LINK_HREF },
		});
		fireEvent.click(getSwitch());
		fireEvent.click(screen.getByText('Bevestig'));

		expect(getOutput()).toContain('target="_blank"');
		expect(getOutput()).toContain(`href="${LINK_HREF}"`);
		expect(getOutput()).toContain('>world</a>');
	});

	it('Should change an existing new window link to open in the same window', async () => {
		const { editor, getOutput } = await renderEditor(
			`<p>Hello <a href="${LINK_HREF}" target="_blank" rel="noopener noreferrer nofollow">world</a></p>`
		);
		selectText(editor, 'world');

		fireEvent.click(screen.getByTitle('Link invoegen'));
		expect(getSwitch().getAttribute('aria-checked')).toEqual('true');
		fireEvent.click(getSwitch());
		fireEvent.click(screen.getByText('Bevestig'));

		expect(getOutput()).toContain('target="_self"');
		expect(getOutput()).not.toContain('_blank');

		// Reopening the popup shows the saved setting
		selectText(editor, 'world');
		fireEvent.click(screen.getByTitle('Link invoegen'));
		expect(getSwitch().getAttribute('aria-checked')).toEqual('false');
	});

	it('Should keep special characters in the link text', async () => {
		const { editor, getOutput } = await renderEditor('<p>Hello world</p>');
		selectText(editor, 'world');

		fireEvent.click(screen.getByTitle('Link invoegen'));
		fireEvent.change(screen.getByPlaceholderText('Linktekst invoeren'), {
			target: { value: 'a <b> & c' },
		});
		fireEvent.change(screen.getByPlaceholderText('Link URL invoeren'), {
			target: { value: LINK_HREF },
		});
		fireEvent.click(screen.getByText('Bevestig'));

		expect(getOutput()).toContain('>a &lt;b&gt; &amp; c</a>');
	});
});
