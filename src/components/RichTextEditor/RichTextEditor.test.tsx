import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import RichTextEditor from './RichTextEditor';
import { RichEditorState, RichTextEditorProps } from './RichTextEditor.types';

const mockValue = 'Text value';

const renderRichTextEditor = ({ initialHtml = mockValue, ...rest }: RichTextEditorProps = {}) => {
	return render(<RichTextEditor {...rest} initialHtml={initialHtml} />);
};

describe('components/<RichTextEditor />', () => {
	it('Should set the correct className', async () => {
		const rootClassName = 'root-class';
		const className = 'custom-class';
		renderRichTextEditor({ className, rootClassName });

		const { container } = renderRichTextEditor({
			rootClassName,
			className,
		});

		await waitFor(() => expect(container.querySelector('.c-content')).toBeInTheDocument());

		const richTextEditor = container.querySelector('.c-content');

		expect(richTextEditor).toHaveClass(rootClassName);
		expect(richTextEditor).toHaveClass(className);
	});

	it('Should pass the correct richTextEditor attributes', async () => {
		const { container } = renderRichTextEditor({
			controls: ['strike-through'],
			disabled: true,
		});

		await waitFor(() => expect(container.querySelector('.c-content')).toBeInTheDocument());
		const richTextEditor = container.querySelector('.c-rich-text-editor');
		expect(richTextEditor).toBeDefined();

		const strikeThroughButton = container.querySelector('[data-title="Doorstreept"]');
		expect(strikeThroughButton).toHaveClass('control-item button');
	});

	it('Should call the onChange handler on every input', () => {
		const initialHtml = '<b>test html</b>';
		const onChange = jest.fn();
		const onChangeWrapper = (newEditorState: RichEditorState) => {
			onChange(newEditorState.toHTML());
		};
		const { container } = renderRichTextEditor({ initialHtml, onChange: onChangeWrapper });

		const textArea = container.querySelector('.public-DraftEditor-content');
		expect(textArea).toBeDefined();
		if (textArea) {
			userEvent.click(textArea);
			expect(onChange).toHaveBeenCalled();
			expect(onChange).toHaveBeenCalledWith('<p><strong>test html</strong></p>');
			expect(textArea.querySelector('[data-text="true"]')).toContainHTML(
				'<span data-text="true">test html</span>'
			);
		}
	});
});
