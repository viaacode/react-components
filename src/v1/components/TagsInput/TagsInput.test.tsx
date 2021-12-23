import { mount, shallow } from 'enzyme';
import React from 'react';

import { TagsInput } from './TagsInput';

const customClass = 'c-tags-input-custom';

const tags = [
	{ label: 'Aluminium', value: 'aluminium' },
	{ label: 'Cadmium', value: 'cadmium' },
	{ label: 'Dubnium', value: 'dubnium' },
	{ label: 'Potassium', value: 'potassium' },
	{ label: 'Vanadium', value: 'vanadium' },
	{ label: 'Palladium', value: 'palladium' },
	{ label: 'Polonium', value: 'polonium' },
	{ label: 'Rhodium', value: 'rhodium' },
	{ label: 'Yttrium', value: 'yttrium' },
	{ label: 'Uranium', value: 'uranium' },
];

describe('<TextInput />', () => {
	it('Should be able to render', () => {
		shallow(<TagsInput options={tags} />);
	});

	it('Should set the correct className', () => {
		const tagstagsInputComponent = shallow(
			<TagsInput options={tags} className={customClass} />
		);

		expect(tagstagsInputComponent.hasClass(customClass)).toEqual(true);
	});

	it('Should pass on the id', () => {
		const id = 'test';

		const tagsInputComponent = shallow(<TagsInput options={tags} id={id} />);

		expect(tagsInputComponent.prop('id')).toEqual(id);
	});

	it('Should be able to set the disabled state', () => {
		const tagsInputComponent = mount(<TagsInput options={tags} disabled={true} />);

		expect(tagsInputComponent.html().includes('c-tags-input--is-disabled')).toEqual(true);
	});

	it('Should be able to set an initial value', () => {
		const values = [
			{ label: 'Potassium', value: 'potassium' },
			{ label: 'Vanadium', value: 'vanadium' },
		];

		const tagsInputComponent = mount(<TagsInput options={tags} value={values} />);

		const selectedTagLabels = tagsInputComponent.find('.c-tags-input__multi-value__label');

		expect(selectedTagLabels.at(0).text()).toEqual(values[0].label);
		expect(selectedTagLabels.at(1).text()).toEqual(values[1].label);
	});

	it('Should call the onChange handler when the input changes', () => {
		const onChangeHandler = jest.fn();

		const tagsInputComponent = mount(<TagsInput options={tags} onChange={onChangeHandler} />);

		// https://stackoverflow.com/questions/41991077/testing-react-select-component
		const tagsInputControl = tagsInputComponent.find('.c-tags-input__control').at(0);
		tagsInputControl.simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });
		tagsInputControl.simulate('keyDown', { key: 'Enter', keyCode: 13 });

		expect(onChangeHandler).toHaveBeenCalled();
		expect(onChangeHandler).toHaveBeenCalledTimes(1);
		expect(onChangeHandler).toHaveBeenCalledWith([tags[0]]);

		tagsInputControl.simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });
		tagsInputControl.simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });
		tagsInputControl.simulate('keyDown', { key: 'Enter', keyCode: 13 });

		expect(onChangeHandler).toHaveBeenCalledTimes(2);
		// Selected items are not shown in dropdown
		expect(onChangeHandler).toHaveBeenCalledWith([tags[0], tags[3]]);
	});
});
