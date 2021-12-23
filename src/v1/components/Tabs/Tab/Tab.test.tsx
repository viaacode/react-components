import { mount, shallow } from 'enzyme';
import React from 'react';

import { Icon } from '../../Icon/Icon';
import { IconNameSchema } from '../../Icon/Icon.types';

import { Tab } from './Tab';

const mockTab = {
	className: 'c-tabs__item-custom',
	label: 'Videos',
	id: 'video',
	active: true,
};

const mockTabWithIcon = {
	...mockTab,
	icon: 'video' as IconNameSchema,
};

describe('<Tab />', () => {
	it('Should be able to render', () => {
		shallow(<Tab {...mockTab} />);
	});

	it('Should set the correct className', () => {
		const tabComponent = shallow(<Tab {...mockTab} />);

		expect(tabComponent.hasClass(mockTab.className)).toEqual(true);
		expect(tabComponent.hasClass('c-tab-item')).toEqual(true);
	});

	it('Should set the correct className when icon is passed', () => {
		const tabComponent = mount(<Tab {...mockTabWithIcon} />);

		const iconComponent = tabComponent.find(Icon);

		expect(iconComponent).toHaveLength(1);
		expect(iconComponent.prop('name')).toEqual(mockTabWithIcon.icon);
	});

	it('Should set the correct className when passing `active`', () => {
		const tabComponent = shallow(<Tab {...mockTab} />);

		expect(tabComponent.hasClass('c-tab-item__active')).toEqual(true);
	});

	it('Should render `label` correctly', () => {
		const tabComponent = shallow(<Tab {...mockTab} />);

		const labelElement = tabComponent.find('span');

		expect(labelElement).toHaveLength(1);

		expect(labelElement.text()).toEqual(mockTab.label);
	});
});
