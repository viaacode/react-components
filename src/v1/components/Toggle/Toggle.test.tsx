import { shallow } from 'enzyme';
import React from 'react';

import { Toggle } from './Toggle';

describe('<Toggle />', () => {
	it('Should be able to render', () => {
		shallow(<Toggle checked={false} />);
	});

	it('Should set the correct className', () => {
		const customClass = 'c-toggle-custom';

		const toggleComponent = shallow(<Toggle className={customClass} checked={false} />);

		expect(toggleComponent.hasClass('c-toggle')).toEqual(true);
		expect(toggleComponent.hasClass(customClass)).toEqual(true);
	});

	it('Should correctly render `checked state`', () => {
		const checkedToggleComponent = shallow(<Toggle checked={true} />);
		const uncheckedToggleComponent = shallow(<Toggle checked={false} />);

		expect(checkedToggleComponent.find('input').prop('checked')).toEqual(true);
		expect(uncheckedToggleComponent.find('input').prop('checked')).toEqual(false);
	});

	it('Should correctly render `id`', () => {
		const id = 'test';

		const toggleComponent = shallow(<Toggle checked={false} id={id} />);

		expect(toggleComponent.find('[type="checkbox"]').prop('id')).toEqual(id);
	});

	it('Should be able to render without `id`', () => {
		const toggleComponent = shallow(<Toggle checked={false} />);

		expect(toggleComponent.find('[type="checkbox"]').prop('id')).toEqual(undefined);
	});

	it('Should be able to set the disabled state', () => {
		const toggleComponent = shallow(<Toggle checked={false} disabled />);

		expect(toggleComponent.find('input').prop('disabled')).toEqual(true);
	});

	it('Should call `onChange` when toggling toggle', () => {
		const onChangeHandler = jest.fn();

		const toggleComponent = shallow(
			<Toggle checked={false} id="one" onChange={onChangeHandler} />
		);

		const toggleElement = toggleComponent.find('[type="checkbox"]');

		toggleElement.simulate('change', { target: { checked: true } });

		expect(onChangeHandler).toHaveBeenCalled();
		expect(onChangeHandler).toHaveBeenCalledTimes(1);
		expect(onChangeHandler).toHaveBeenCalledWith(true);
	});
});
