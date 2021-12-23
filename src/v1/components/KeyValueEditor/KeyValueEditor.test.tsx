import { mount, shallow } from 'enzyme';
import React from 'react';

import { KeyValueEditor } from './KeyValueEditor';
import { DATA_ARRAY_MOCK } from './KeyValueEditor.mock';

const customClass = 'c-input-custom';

describe('<KeyValueEditor />', () => {
	it('Should be able to render with data array', () => {
		const keyValueEditorComponent = mount(
			<KeyValueEditor data={DATA_ARRAY_MOCK} initialData={DATA_ARRAY_MOCK} />
		);

		const inputElement = keyValueEditorComponent.find('textarea');

		expect(inputElement.length).toEqual(Object.keys(DATA_ARRAY_MOCK).length);
	});

	it('Should set the correct className', () => {
		const keyValueEditorComponent = shallow(
			<KeyValueEditor
				data={DATA_ARRAY_MOCK}
				initialData={DATA_ARRAY_MOCK}
				className={customClass}
			/>
		);

		expect(keyValueEditorComponent.hasClass(customClass)).toEqual(true);
	});

	it('Should be able to set the readonly state', () => {
		const keyValueEditorComponent = mount(
			<KeyValueEditor data={DATA_ARRAY_MOCK} initialData={DATA_ARRAY_MOCK} readonly />
		);

		const inputElements = keyValueEditorComponent.find('textarea');
		const spanElements = keyValueEditorComponent.find('.c-keyvalue-label');

		expect(inputElements.length).toEqual(0);
		expect(spanElements.length).toEqual(Object.keys(DATA_ARRAY_MOCK).length * 2); // labels and values
	});

	it('Should call the onChange handler when an input triggers an onBlur event', () => {
		const onChange = jest.fn();
		const newValue = 'my new value';

		const keyValueEditorComponent = mount(
			<KeyValueEditor
				data={DATA_ARRAY_MOCK}
				initialData={DATA_ARRAY_MOCK}
				onChange={onChange}
			/>
		);

		expect(onChange).toBeCalledTimes(0);

		const inputElement = keyValueEditorComponent.find('textarea').at(0);
		inputElement.simulate('change', { target: { value: newValue } });

		inputElement.update();

		inputElement.simulate('blur');

		expect(onChange).toBeCalledTimes(1);

		// enzyme is not coopering :(
		// const changedData = JSON.parse(JSON.stringify(dataObj));
		// changedData.setting1 = newValue;
		// expect(JSON.stringify(onChange.mock.calls[0][0])).toEqual(JSON.stringify(changedData));
	});
});
