import { shallow } from 'enzyme';
import React from 'react';

import { Header } from './Header';
import { MOCK_HEADER_PROPS_FULL } from './Header.mock';

describe('<Header />', () => {
	it('Should be able to render', () => {
		shallow(<Header {...MOCK_HEADER_PROPS_FULL} />);
	});

	it('should pass a custom className', () => {
		const customClass = 'c-header-custom';
		const HeaderComponent = <Header className={customClass} {...MOCK_HEADER_PROPS_FULL} />;

		expect(shallow(HeaderComponent).hasClass(customClass)).toBeTruthy();
	});
});
