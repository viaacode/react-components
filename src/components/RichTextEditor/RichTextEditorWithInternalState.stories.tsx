import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { cloneElement, type ReactElement, useState } from 'react';

import Select from '../Select/Select';
import { selectOptionsMock } from '../Select/__mocks__/select';

import type {
	RichTextEditorControl,
	RichTextEditorWithInternalStateProps,
} from './RichTextEditor.types';
import RichTextEditorWithInternalState from './RichTextEditorWithInternalState';

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
	value: '<h2>Welcome!</h2><p>This prefilled content is all <strong>editable</strong>.</p>',
};

const RichTextEditorWithInternalStateStoryComponent = ({
	children,
	...props
}: {
	children: ReactElement;
} & RichTextEditorWithInternalStateProps) => {
	const [value, setValue] = useState<string>(props.value || '');

	return cloneElement(children, {
		value,
		onChange: (newHtml: string) => {
			action('onChange')(newHtml);
			setValue(newHtml);
		},
	});
};

export default {
	title: 'Components/RichTextEditorWithInternalState',
	component: RichTextEditorWithInternalState,
} as ComponentMeta<typeof RichTextEditorWithInternalState>;

const Template: ComponentStory<typeof RichTextEditorWithInternalState> = (args) => (
	<RichTextEditorWithInternalStateStoryComponent {...args}>
		<RichTextEditorWithInternalState {...args} />
	</RichTextEditorWithInternalStateStoryComponent>
);

const TemplateWithSelect: ComponentStory<typeof RichTextEditorWithInternalState> = (args) => (
	<>
		<div style={{ marginBottom: '5px' }}>
			<Select options={selectOptionsMock} />
		</div>

		<RichTextEditorWithInternalStateStoryComponent>
			<RichTextEditorWithInternalState {...args} />
		</RichTextEditorWithInternalStateStoryComponent>
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
	value:
		'<p></p><p></p><table class="c-editor-table"><tr><td colSpan="1" rowSpan="1"><u>dit is een test</u></td><td colSpan="1" rowSpan="1"><u>dit ook</u></td><td colSpan="1" rowSpan="1"><u>ook dit</u></td></tr><tr><td colSpan="1" rowSpan="1">test</td><td colSpan="1" rowSpan="1"><strong>test</strong></td><td colSpan="1" rowSpan="1">test</td></tr><tr><td colSpan="1" rowSpan="1"></td><td colSpan="1" rowSpan="1"></td><td colSpan="1" rowSpan="1"></td></tr></table><p></p>',
};

export const WithSelectAboveItZIndex = TemplateWithSelect.bind({});
WithSelectAboveItZIndex.args = {
	controls: RICH_TEXT_EDITOR_OPTIONS,
};

export const WithLimitedHeadings = Template.bind({});
WithLimitedHeadings.args = {
	enabledHeadings: ['h3', 'h4', 'h6'],
};

export const WithHtmlView = Template.bind({});
WithHtmlView.args = {
	...MOCK_RICH_TEXT_EDITOR_PROPS,
	controls: [...RICH_TEXT_EDITOR_OPTIONS, 'separator', 'editHtml'],
};
