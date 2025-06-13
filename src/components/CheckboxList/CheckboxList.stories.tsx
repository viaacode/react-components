import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { cloneElement, type FC, type ReactElement, type ReactNode, useState } from 'react';

import CheckboxList from './CheckboxList';

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

export default {
	title: 'Components/CheckboxList',
	component: CheckboxList,
} as ComponentMeta<typeof CheckboxList>;

const Template: ComponentStory<typeof CheckboxList> = (args) => (
	<CheckboxListStoryComponent>
		<CheckboxList {...args} />
	</CheckboxListStoryComponent>
);

export const Default = Template.bind({});
Default.args = {
	items: DEFAULT_ITEMS,
};
