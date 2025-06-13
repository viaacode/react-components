import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Tag from './Tag';

export default {
	title: 'Components/Tag',
	component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Tag 1',
};

export const CustomCloseButton = Template.bind({});
CustomCloseButton.args = {
	label: 'Tag 1',
	closeButton: (
		<div role="button" tabIndex={0} onClick={action('Custom close button')} onKeyDown={() => null}>
			Close
		</div>
	),
};
