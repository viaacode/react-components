import { shallow } from 'enzyme';
import React from 'react';

import { TextArea } from './TextArea';

describe('<TextArea />', () => {
	it('Should be able to render', () => {
		shallow(<TextArea />);
	});

	it('Should set the correct className', () => {
		const customClass = 'c-textarea-custom';

		const textAreaComponent = shallow(<TextArea className={customClass} />);

		const textAreaElement = textAreaComponent.find('textarea');

		expect(textAreaElement.hasClass(customClass)).toEqual(true);
		expect(textAreaElement.hasClass('c-input')).toEqual(true);
	});

	it('Should pass on the id', () => {
		const id = 'test';

		const textAreaComponent = shallow(<TextArea id={id} />);

		const textAreaElement = textAreaComponent.find('textarea');

		expect(textAreaElement.prop('id')).toEqual(id);
	});

	it('Should pass on the name', () => {
		const name = 'test';

		const textAreaComponent = shallow(<TextArea name={name} />);

		const textAreaElement = textAreaComponent.find('textarea');

		expect(textAreaElement.prop('name')).toEqual(name);
	});

	it('Should be able to set the disabled state', () => {
		const textAreaComponent = shallow(<TextArea disabled />);

		const textAreaElement = textAreaComponent.find('textarea');

		expect(textAreaElement.prop('disabled')).toEqual(true);
	});

	it('Should be able to set the placeholder value', () => {
		const placeholder = 'this is a test placeholder';

		const textAreaComponent = shallow(<TextArea placeholder={placeholder} />);

		const textAreaElement = textAreaComponent.find('textarea');

		expect(textAreaElement.prop('placeholder')).toEqual(placeholder);
	});

	it('Should be able to set an initial value', () => {
		const value = 'default test value';

		const textAreaComponent = shallow(<TextArea value={value} />);

		const textAreaElement = textAreaComponent.find('textarea');

		expect(textAreaElement.prop('value')).toEqual(value);
	});

	it('Should be able to set the rows for the textarea', () => {
		const rows = 1001;

		const textAreaComponent = shallow(<TextArea rows={rows} />);

		const textAreaElement = textAreaComponent.find('textarea');

		expect(textAreaElement.prop('rows')).toEqual(rows);
	});

	it('Should set the correct classnames for the `height`-prop', () => {
		const smallTextAreaComponent = shallow(<TextArea height="small" />);
		const mediumTextAreaComponent = shallow(<TextArea height="medium" />);
		const largeTextAreaComponent = shallow(<TextArea height="large" />);

		const smallTextAreaElement = smallTextAreaComponent.find('textarea');
		const mediumTextAreaElement = mediumTextAreaComponent.find('textarea');
		const largeTextAreaElement = largeTextAreaComponent.find('textarea');

		expect(smallTextAreaElement.hasClass('c-input--h-small')).toEqual(true);
		expect(mediumTextAreaElement.hasClass('c-input--h-medium')).toEqual(true);
		expect(largeTextAreaElement.hasClass('c-input--h-large')).toEqual(true);
	});

	it('Should set the correct classnames for the `width`-prop', () => {
		const xsmallTextAreaComponent = shallow(<TextArea width="xsmall" />);
		const smallTextAreaComponent = shallow(<TextArea width="small" />);
		const mediumTextAreaComponent = shallow(<TextArea width="medium" />);
		const largeTextAreaComponent = shallow(<TextArea width="large" />);

		const xsmallTextAreaElement = xsmallTextAreaComponent.find('textarea');
		const smallTextAreaElement = smallTextAreaComponent.find('textarea');
		const mediumTextAreaElement = mediumTextAreaComponent.find('textarea');
		const largeTextAreaElement = largeTextAreaComponent.find('textarea');

		expect(xsmallTextAreaElement.hasClass('c-input--w-xsmall')).toEqual(true);
		expect(smallTextAreaElement.hasClass('c-input--w-small')).toEqual(true);
		expect(mediumTextAreaElement.hasClass('c-input--w-medium')).toEqual(true);
		expect(largeTextAreaElement.hasClass('c-input--w-large')).toEqual(true);
	});

	it('Should call the onChange handler when the textArea changes', () => {
		const onChangeHandler = jest.fn();

		const textAreaComponent = shallow(<TextArea onChange={onChangeHandler} />);

		const textAreaElement = textAreaComponent.find('textarea');

		textAreaElement.simulate('change', { target: { value: 'test' } });

		expect(onChangeHandler).toHaveBeenCalled();
		expect(onChangeHandler).toHaveBeenCalledTimes(1);
		expect(onChangeHandler).toHaveBeenCalledWith('test');

		textAreaElement.simulate('change', { target: { value: 'testing' } });

		expect(onChangeHandler).toHaveBeenCalledTimes(2);
		expect(onChangeHandler).toHaveBeenCalledWith('testing');
	});
});
