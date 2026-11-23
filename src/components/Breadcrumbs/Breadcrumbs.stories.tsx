import type { Meta, StoryObj } from '@storybook/react-vite';

import Breadcrumbs from './Breadcrumbs';
import { MOCK_BREADCRUMBS } from './Breadcrumbs.mock';

const meta: Meta<typeof Breadcrumbs> = {
	title: 'Components/Breadcrumbs',
	component: Breadcrumbs,
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
	args: {
		icon: <span>-</span>,
		linkComponent: ({ href, className, children, style }) => (
			<a href={href} className={className} style={style}>
				{children}
			</a>
		),
		items: MOCK_BREADCRUMBS,
	},
};
