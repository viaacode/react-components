import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import Select from '../Select/Select';
import { selectOptionsMock } from '../Select/__mocks__/select';

import RichTextEditor from './RichTextEditor';
import { RichTextEditorControl } from './RichTextEditor.types';

const RICH_TEXT_EDITOR_OPTIONS: RichTextEditorControl[] = [
	'fullscreen',
	'separator',
	'undo',
	'redo',
	'separator',
	'headings',
	'separator',
	'bold',
	'underline',
	'italic',
	'separator',
	'link',
	'separator',
	'list-ul',
	'list-ol',
];

const MOCK_RICH_TEXT_EDITOR_PROPS = {
	initialHtml: '<h2>Welcome!</h2><p>This prefilled content is all <strong>editable</strong>.</p>',
};

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

export default {
	title: 'Components/RichTextEditor',
	component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>;

const Template: ComponentStory<typeof RichTextEditor> = (args) => (
	<RichTextEditorStoryComponent>
		<RichTextEditor {...args} />
	</RichTextEditorStoryComponent>
);

const TemplateWithSelect: ComponentStory<typeof RichTextEditor> = (args) => (
	<>
		<div style={{ marginBottom: '5px' }}>
			<Select options={selectOptionsMock} />
		</div>

		<RichTextEditorStoryComponent>
			<RichTextEditor {...args} />
		</RichTextEditorStoryComponent>
	</>
);

export const Default = Template.bind({});
Default.args = MOCK_RICH_TEXT_EDITOR_PROPS;

export const Placeholder = Template.bind({});
Placeholder.args = {
	placeholder: 'Start typing here...',
};

export const Disabled = Template.bind({});
Disabled.args = {
	...MOCK_RICH_TEXT_EDITOR_PROPS,
	disabled: true,
};

export const WithLimitedButtons = Template.bind({});
WithLimitedButtons.args = {
	...MOCK_RICH_TEXT_EDITOR_PROPS,
	controls: RICH_TEXT_EDITOR_OPTIONS,
};

export const WithTableButton = Template.bind({});
WithTableButton.args = {
	...MOCK_RICH_TEXT_EDITOR_PROPS,
	controls: [...RICH_TEXT_EDITOR_OPTIONS, 'separator', 'table'],
};

export const WithInitialTable = Template.bind({});
WithInitialTable.args = {
	...MOCK_RICH_TEXT_EDITOR_PROPS,
	controls: [...RICH_TEXT_EDITOR_OPTIONS, 'separator', 'table'],
	initialHtml:
		'<p></p><p></p><table class="c-editor-table"><tr><td colSpan="1" rowSpan="1"><u>dit is een test</u></td><td colSpan="1" rowSpan="1"><u>dit ook</u></td><td colSpan="1" rowSpan="1"><u>ook dit</u></td></tr><tr><td colSpan="1" rowSpan="1">test</td><td colSpan="1" rowSpan="1"><strong>test</strong></td><td colSpan="1" rowSpan="1">test</td></tr><tr><td colSpan="1" rowSpan="1"></td><td colSpan="1" rowSpan="1"></td><td colSpan="1" rowSpan="1"></td></tr></table><p></p>',
};

export const WithSelectAboveItZIndex = TemplateWithSelect.bind({});
WithSelectAboveItZIndex.args = {
	controls: RICH_TEXT_EDITOR_OPTIONS,
};
