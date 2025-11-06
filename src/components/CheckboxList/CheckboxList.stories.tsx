import type { Meta, StoryObj } from '@storybook/react';
import React, { cloneElement, type FC, type ReactElement, type ReactNode, useState } from 'react';
import { action } from 'storybook/actions';

import CheckboxList from './CheckboxList.js';

const DEFAULT_ITEMS: { label: string; value: unknown; checked?: boolean }[] = [
	{ label: 'item A', value: 'itemA' },
	{ label: 'item B', value: 'itemB' },
	{ label: 'item C', value: 'itemC' },
];

const CheckboxListStoryComponent: FC<{ children?: ReactNode }> = ({ children }) => {
	const [items, setItems] =
		useState<{ label: string; value: unknown; checked?: boolean }[]>(DEFAULT_ITEMS);

	const onItemClick = (checked: boolean, value: string) => {
		action(`onChange: checked: ${checked}, value: ${value}`)();
		setItems((oldItems) => {
			const newItems = [...oldItems];
			const clickedItem = oldItems.find((item) => item.value === value);
			if (clickedItem) {
				clickedItem.checked = !checked;
			}
			return newItems;
		});
	};

	return cloneElement(children as ReactElement, {
		items,
		onItemClick,
	});
};

const meta: Meta<typeof CheckboxList> = {
	title: 'Components/CheckboxList',
	component: CheckboxList,
};
export default meta;
type Story = StoryObj<typeof CheckboxList>;

export const Default: Story = {
	args: {
		items: DEFAULT_ITEMS,
	},
	render: (args) => (
		<CheckboxListStoryComponent>
			<CheckboxList {...args} />
		</CheckboxListStoryComponent>
	),
};
