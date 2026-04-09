import type { Meta, StoryObj } from '@storybook/react';
import { cloneElement, type ReactElement, useState } from 'react';

import { menuItems } from '../Menu/__mocks__/menu';
import { MoreOptionsDropdown } from './MoreOptionsDropdown';

const MoreOptionsDropdownStory = ({
	children,
}: {
	children: ReactElement<any>;
	defaultValue?: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return cloneElement(children, {
		isOpen,
		onClose: () => setIsOpen(false),
		onOpen: () => setIsOpen(true),
	});
};

const meta: Meta<typeof MoreOptionsDropdown> = {
	title: 'components/MoreOptionsDropdown',
	component: MoreOptionsDropdown,
	tags: ['autodocs'],
	parameters: {
		jest: ['MoreOptionsDropdown'],
	},
};
export default meta;

type Story = StoryObj<typeof MoreOptionsDropdown>;

export const Default: Story = {
	render: () => (
		<MoreOptionsDropdownStory>
			<MoreOptionsDropdown
				id="test-id"
				onOptionClicked={() => console.info('clicked menu item')}
				menuItems={menuItems}
				isOpen={false}
				onOpen={() => {}}
				onClose={() => {}}
			/>
		</MoreOptionsDropdownStory>
	),
};
