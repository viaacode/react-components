import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import Select from '../Select/Select';
import { selectOptionsMock } from '../Select/__mocks__/select';

import { RichTextEditor } from './RichTextEditor';
import { RichTextEditorControlSchema } from './RichTextEditor.types';

const withContent = (story: any) => <div className="c-content">{story()}</div>;

export const RICH_TEXT_EDITOR_OPTIONS: RichTextEditorControlSchema[] = [
	'undo',
	'redo',
	'separator',
	'bold',
	'italic',
	'underline',
	'separator',
	'list-ul',
	'list-ol',
	'separator',
	'link',
];

const RichTextEditorStoryComponent = ({ children }: { children: ReactElement }) => {
	const [state, setState] = useState(null);

	return cloneElement(children, {
		state,
		onChange: (newState: any) => {
			action('onChange')(newState.toHTML());
			setState(newState);
		},
	});
};

storiesOf('components/RichTextEditor', module)
	.addParameters({ jest: ['RichTextEditor'] })
	.addDecorator(withContent)
	.add('RichTextEditor', () => (
		<RichTextEditorStoryComponent>
			<RichTextEditor
				initialHtml={
					'<h2>Welcome!</h2><p>This prefilled content is all <strong>editable</strong>.</p>'
				}
			/>
		</RichTextEditorStoryComponent>
	))
	.add('RichTextEditor disabled', () => (
		<RichTextEditorStoryComponent>
			<RichTextEditor
				initialHtml={
					'<h2>Welcome!</h2><p>This prefilled content is all <strong>editable</strong>.</p>'
				}
				disabled
			/>
		</RichTextEditorStoryComponent>
	))
	.add('RichTextEditor with limited buttons', () => (
		<RichTextEditorStoryComponent>
			<RichTextEditor controls={RICH_TEXT_EDITOR_OPTIONS} />
		</RichTextEditorStoryComponent>
	))
	.add('RichTextEditor with table button', () => (
		<RichTextEditorStoryComponent>
			<RichTextEditor controls={[...RICH_TEXT_EDITOR_OPTIONS, 'separator', 'table']} />
		</RichTextEditorStoryComponent>
	))
	.add('RichTextEditor with initial table html', () => (
		<RichTextEditorStoryComponent>
			<RichTextEditor
				controls={[...RICH_TEXT_EDITOR_OPTIONS, 'separator', 'table']}
				initialHtml={
					'<p></p><p></p><table class="c-editor-table"><tr><td colSpan="1" rowSpan="1"><u>dit is een test</u></td><td colSpan="1" rowSpan="1"><u>dit ook</u></td><td colSpan="1" rowSpan="1"><u>ook dit</u></td></tr><tr><td colSpan="1" rowSpan="1">test</td><td colSpan="1" rowSpan="1"><strong>test</strong></td><td colSpan="1" rowSpan="1">test</td></tr><tr><td colSpan="1" rowSpan="1"></td><td colSpan="1" rowSpan="1"></td><td colSpan="1" rowSpan="1"></td></tr></table><p></p>'
				}
			/>
		</RichTextEditorStoryComponent>
	))
	.add('RichTextEditor with select above it (z-index)', () => (
		<>
			<div style={{ marginBottom: '5px' }}>
				<Select options={selectOptionsMock} />
			</div>

			<RichTextEditorStoryComponent>
				<RichTextEditor controls={[...RICH_TEXT_EDITOR_OPTIONS, 'separator', 'table']} />
			</RichTextEditorStoryComponent>
		</>
	));
