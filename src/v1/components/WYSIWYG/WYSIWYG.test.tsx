import { shallow } from 'enzyme';
import React from 'react';

import { WYSIWYG } from './WYSIWYG';

describe('<WYSIWYG />', () => {
	it('Should be able to render', () => {
		shallow(<WYSIWYG id="test" />);
	});

	it('Should correctly pass on `id`', () => {
		const id = 'id';

		const wysiwygComponent = shallow(<WYSIWYG id={id} />);

		expect(wysiwygComponent.prop('id')).toEqual(id);
	});
});
