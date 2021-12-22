import { mount, shallow } from 'enzyme';
import React from 'react';

import { FileInput } from './FileInput';

const customClass = 'c-input-custom';

describe('<TextInput />', () => {
	it('Should be able to render', () => {
		shallow(<FileInput />);
	});

	it('Should set the correct className', () => {
		const inputComponent = shallow(<FileInput className={customClass} />);

		expect(inputComponent.hasClass(customClass)).toEqual(true);
	});

	it('Should pass on the id', () => {
		const id = 'test';

		const inputComponent = shallow(<FileInput id={id} />);

		const inputElement = inputComponent.find('input');

		expect(inputElement.prop('id')).toEqual(id);
	});

	it('Should be able to set the disabled state', () => {
		const inputComponent = shallow(<FileInput disabled />);

		const inputElement = inputComponent.find('input');

		expect(inputElement.prop('disabled')).toEqual(true);
	});

	it('Should be able to set the placeholder value', () => {
		const placeholder = 'this is a test placeholder';

		const inputComponent = mount(<FileInput placeholder={placeholder} />);

		const buttonLabel = inputComponent.find('.c-button__label');

		expect(buttonLabel.text()).toEqual(placeholder);
	});
});
