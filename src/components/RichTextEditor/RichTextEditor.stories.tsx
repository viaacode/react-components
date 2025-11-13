import type { Meta, StoryObj } from '@storybook/react-vite';
import { cloneElement, type ReactElement, useState } from 'react';
import { action } from 'storybook/actions';
import { selectOptionsMock } from '../Select/__mocks__/select';
import Select from '../Select/Select';

import RichTextEditor from './RichTextEditor';
import type { RichTextEditorControl } from './RichTextEditor.types';

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

const meta: Meta<typeof RichTextEditor> = {
	title: 'Components/RichTextEditor',
	component: RichTextEditor,
};
export default meta;
type Story = StoryObj<typeof RichTextEditor>;

const Template = (args: any) => (
	<RichTextEditorStoryComponent>
		<RichTextEditor {...args} />
	</RichTextEditorStoryComponent>
);

const TemplateWithSelect = (args: any) => (
	<>
		<div style={{ marginBottom: '5px' }}>
			<Select options={selectOptionsMock} />
		</div>
		<RichTextEditorStoryComponent>
			<RichTextEditor {...args} />
		</RichTextEditorStoryComponent>
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
		initialHtml:
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
