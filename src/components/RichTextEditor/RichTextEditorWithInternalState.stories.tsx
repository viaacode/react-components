import type { Meta, StoryObj } from '@storybook/react';
import { cloneElement, type ReactElement, useState } from 'react';
import { action } from 'storybook/actions';
import { selectOptionsMock } from '../Select/__mocks__/select.js';
import Select from '../Select/Select.js';
import type {
	RichTextEditorControl,
	RichTextEditorWithInternalStateProps,
} from './RichTextEditor.types.js';
import RichTextEditorWithInternalState from './RichTextEditorWithInternalState.js';

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
		onChange: (newValue: string) => {
			action('onChange')(newValue);
			setValue(newValue);
		},
	});
};

const meta: Meta<typeof RichTextEditorWithInternalState> = {
	title: 'Components/RichTextEditorWithInternalState',
	component: RichTextEditorWithInternalState,
};
export default meta;
type Story = StoryObj<typeof RichTextEditorWithInternalState>;

const Template = (args: any) => (
	<RichTextEditorWithInternalStateStoryComponent {...args}>
		<RichTextEditorWithInternalState {...args} />
	</RichTextEditorWithInternalStateStoryComponent>
);

const TemplateWithSelect = (args: any) => (
	<>
		<div style={{ marginBottom: '5px' }}>
			<Select options={selectOptionsMock} />
		</div>
		<RichTextEditorWithInternalStateStoryComponent {...args}>
			<RichTextEditorWithInternalState {...args} />
		</RichTextEditorWithInternalStateStoryComponent>
	</>
);

export const Default: Story = {
	args: MOCK_RICH_TEXT_EDITOR_PROPS,
	render: Template,
};

export const Placeholder: Story = {
	args: {
		placeholder: 'Start typing here...',
	},
	render: Template,
};

export const Disabled: Story = {
	args: {
		...MOCK_RICH_TEXT_EDITOR_PROPS,
		disabled: true,
	},
	render: Template,
};

export const WithLimitedButtons: Story = {
	args: {
		...MOCK_RICH_TEXT_EDITOR_PROPS,
		controls: RICH_TEXT_EDITOR_OPTIONS,
	},
	render: Template,
};

export const WithTableButton: Story = {
	args: {
		...MOCK_RICH_TEXT_EDITOR_PROPS,
		controls: [...RICH_TEXT_EDITOR_OPTIONS, 'separator', 'table'],
	},
	render: Template,
};

export const WithInitialTable: Story = {
	args: {
		...MOCK_RICH_TEXT_EDITOR_PROPS,
		controls: [...RICH_TEXT_EDITOR_OPTIONS, 'separator', 'table'],
		value:
			'<p></p><p></p><table class="c-editor-table"><tr><td colSpan="1" rowSpan="1"><u>dit is een test</u></td><td colSpan="1" rowSpan="1"><u>dit ook</u></td><td colSpan="1" rowSpan="1"><u>ook dit</u></td></tr><tr><td colSpan="1" rowSpan="1">test</td><td colSpan="1" rowSpan="1"><strong>test</strong></td><td colSpan="1" rowSpan="1">test</td></tr><tr><td colSpan="1" rowSpan="1"></td><td colSpan="1" rowSpan="1"></td><td colSpan="1" rowSpan="1"></td></tr></table><p></p>',
	},
	render: Template,
};

export const WithSelectAboveItZIndex: Story = {
	args: {
		controls: RICH_TEXT_EDITOR_OPTIONS,
	},
	render: TemplateWithSelect,
};

export const WithLimitedHeadings: Story = {
	args: {
		enabledHeadings: ['h3', 'h4', 'h6'],
	},
	render: Template,
};

export const WithHtmlView: Story = {
	args: {
		...MOCK_RICH_TEXT_EDITOR_PROPS,
		controls: [...RICH_TEXT_EDITOR_OPTIONS, 'separator', 'editHtml'],
	},
	render: Template,
};
