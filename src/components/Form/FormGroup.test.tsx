import { shallow } from 'enzyme';
import React, { Fragment } from 'react';

import { FormGroup } from './FormGroup';

describe('<FormGroup />', () => {
	it('Should be able to render', () => {
		shallow(
			<FormGroup>
				<Fragment />
			</FormGroup>
		);
	});

	it('Should correctly set the className', () => {
		const formGroupComponent = shallow(
			<FormGroup>
				<Fragment />
			</FormGroup>
		);

		expect(formGroupComponent.hasClass('o-form-group')).toEqual(true);
	});

	it('Should render a label when it is passed', () => {
		const id = 'test';
		const label = 'test form';

		const formGroupComponent = shallow(
			<FormGroup labelFor={id} label={label}>
				<Fragment />
			</FormGroup>
		);

		const labelElement = formGroupComponent.find('label.o-form-group__label');

		expect(labelElement.prop('htmlFor')).toEqual(id);
		expect(labelElement.text()).toEqual(label);
	});

	it('Should not render a label when none is passed', () => {
		const formGroupComponent = shallow(
			<FormGroup>
				<Fragment />
			</FormGroup>
		);

		const labelElement = formGroupComponent.find('label.o-form-group__label');

		expect(labelElement).toHaveLength(0);
	});

	it('Should set className and render an error when it is passed', () => {
		const error = 'Field is invalid.';

		const formGroupComponent = shallow(
			<FormGroup error={error}>
				<Fragment />
			</FormGroup>
		);

		const errorElement = formGroupComponent.find('.c-form-help-text--error');

		expect(errorElement.text()).toEqual(error);
	});

	it('Should not set className and not render an error when none is passed', () => {
		const formGroupComponent = shallow(
			<FormGroup>
				<Fragment />
			</FormGroup>
		);

		const errorElement = formGroupComponent.find('.c-form-help-text--error');

		expect(errorElement).toHaveLength(0);
	});

	it('Should correctly pass children', () => {
		const formGroupComponent = shallow(
			<FormGroup>
				<input type="text" id="test" />
			</FormGroup>
		);

		expect(formGroupComponent.contains(<input type="text" id="test" />)).toEqual(true);
	});
});