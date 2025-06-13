import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Badge from './Badge';

export default {
	title: 'Components/Badge',
	component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
	text: 'Pending approval',
};

export const SuccessBadge = Template.bind({});
SuccessBadge.args = {
	text: 'Approval granted',
	type: 'success',
};

export const ErrorBadge = Template.bind({});
ErrorBadge.args = {
	text: 'Approval denied',
	type: 'error',
};
