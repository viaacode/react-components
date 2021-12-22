import { mount, shallow } from 'enzyme';
import React from 'react';

import { Button } from '../Button/Button';

import { ToggleButton } from './ToggleButton';

describe('<ToggleButton ariaLabel="test button" />', () => {
	it('Should be able to render', () => {
		shallow(<ToggleButton ariaLabel="test button" icon="heart" active={false} />);
	});

	it('should correctly pass a custom className', () => {
		const customClass = 'c-toggle-button-custom';

		const toggleButtonComponent = shallow(
			<ToggleButton
				ariaLabel="test button"
				className={customClass}
				icon="heart"
				active={false}
			/>
		);

		expect(toggleButtonComponent.hasClass(customClass)).toBeTruthy();
	});

	it('Should set aria label', () => {
		const inactiveToggleButtonComponent = mount(
			<ToggleButton ariaLabel="toggle favorite" icon="heart" active={false} />
		);
		const activeToggleButtonComponent = mount(
			<ToggleButton ariaLabel="toggle favorite" icon="heart" active={true} />
		);

		expect(inactiveToggleButtonComponent.find('button').prop('aria-label')).toEqual(
			'toggle favorite (currently not active)'
		);
		expect(activeToggleButtonComponent.find('button').prop('aria-label')).toEqual(
			'toggle favorite (currently active)'
		);
	});

	it('Should set title tooltip', () => {
		const toggleButtonComponent = mount(
			<ToggleButton
				title="toggle favorite"
				ariaLabel="toggle favorite"
				icon="heart"
				active={false}
			/>
		);

		expect(toggleButtonComponent.find('button').prop('title')).toEqual('toggle favorite');
	});

	it('Should set the normal version of the icon when not `active`', () => {
		const toggleButtonComponent = shallow(
			<ToggleButton ariaLabel="test button" icon="bookmark" active={false} />
		);

		const buttonComponent = toggleButtonComponent.find(Button);

		expect(buttonComponent.prop('icon')).toEqual('bookmark');
	});

	it('Should set the filled version of the icon when `active`', () => {
		const toggleButtonComponent = shallow(
			<ToggleButton ariaLabel="test button" icon="bookmark" active={true} />
		);

		const buttonComponent = toggleButtonComponent.find(Button);

		expect(buttonComponent.prop('icon')).toEqual('bookmark-filled');
	});

	it('Should call the `onClick`-handler when clicked', () => {
		const onClickHandler = jest.fn();

		const active = true;

		const toggleButtonComponent = mount(
			<ToggleButton
				ariaLabel="test button"
				icon="bookmark"
				active={active}
				onClick={onClickHandler}
			/>
		);

		const buttonElement = toggleButtonComponent.find('button');

		buttonElement.simulate('click');

		expect(onClickHandler).toHaveBeenCalled();
		expect(onClickHandler).toHaveBeenCalledTimes(1);
		expect(onClickHandler).toHaveBeenCalledWith(!active);

		buttonElement.simulate('click');

		expect(onClickHandler).toHaveBeenCalledTimes(2);
		expect(onClickHandler).toHaveBeenCalledWith(active);
	});
});
