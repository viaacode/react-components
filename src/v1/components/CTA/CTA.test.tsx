import { shallow } from 'enzyme';
import React from 'react';

import { CTA } from './CTA';
import { CTA_MOCK } from './CTA.mock';

describe('<CTA />', () => {
	it('Should be able to render', () => {
		shallow(<CTA {...CTA_MOCK} />);
	});

	it('Should set the correct className', () => {
		const component = shallow(<CTA {...CTA_MOCK} />);

		expect(component.hasClass('c-cta-item')).toEqual(true);
	});
});
