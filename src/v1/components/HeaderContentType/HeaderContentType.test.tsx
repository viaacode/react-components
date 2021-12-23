import { shallow } from 'enzyme';
import React from 'react';

import { HeaderContentType } from './HeaderContentType';

describe('<HeaderContentType />', () => {
	it('Should be able to render', () => {
		shallow(<HeaderContentType category="collection" label="collectie" />);
	});

	it('should pass a custom className', () => {
		const customClass = 'c-header-content-type-custom';
		const HeaderContentTypeComponent = (
			<HeaderContentType className={customClass} category="collection" label="collectie" />
		);

		expect(shallow(HeaderContentTypeComponent).hasClass(customClass)).toBeTruthy();
	});
});
