import { mount, shallow } from 'enzyme';
import React from 'react';

import { AvatarList } from './AvatarList';
import { mockAvatars } from './AvatarList.stories';

describe('AvatarList', () => {
	const avatarsLength = mockAvatars.length;
	const visibleAvatarsLength = mockAvatars.slice(0, 3).length;
	const hiddenAvatarsLength = mockAvatars.slice(3, avatarsLength).length;

	const customClass = 'c-avatar-list-custom';

	const avatarList = <AvatarList avatars={mockAvatars} className={customClass} isOpen={false} />;
	const wrapper = mount(avatarList);

	it('should render', () => {
		shallow(avatarList);
	});

	it('should pass a custom className', () => {
		expect(shallow(avatarList).hasClass(customClass)).toBeTruthy();
	});

	it('should only show 3 visible avatars if more are given', () => {
		const visibleAvatars = wrapper.find('.c-tooltip');

		expect(avatarsLength).toBeGreaterThan(3);
		expect(visibleAvatars).toHaveLength(visibleAvatarsLength);
	});

	it('should show a button with the amount of hidden avatars if more than 3 are given', () => {
		expect(wrapper.find('.c-avatar-dropdown')).toHaveLength(1);
		expect(wrapper.find('.c-avatar-dropdown').text()).toEqual(`+${hiddenAvatarsLength}`);
	});

	it('should show the hidden avatars when isOpen prop equals true', () => {
		const menuElement = wrapper.find('.c-menu');

		wrapper.setProps({ isOpen: true });
		expect(menuElement.hasClass('c-menu--visible'));
		expect(menuElement.find('.c-avatar')).toHaveLength(hiddenAvatarsLength);
	});
});
