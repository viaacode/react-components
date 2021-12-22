import { mount, shallow } from 'enzyme';
import React from 'react';

import { BlockAccordions } from './BlockAccordions';
import { ACCORDIONS_MOCK } from './BlockAccordions.mock';

describe('<BlockAccordions />', () => {
	it('Should be able to render', () => {
		shallow(<BlockAccordions elements={ACCORDIONS_MOCK} />);
	});

	it('should pass a custom className', () => {
		const customClass = 'c-block-accordions-custom';
		const blockComponent = shallow(
			<BlockAccordions className={customClass} elements={ACCORDIONS_MOCK} />
		);

		expect(blockComponent.hasClass(customClass)).toBeTruthy();
	});

	it('Should correctly render accordions', () => {
		const blockComponent = mount(<BlockAccordions elements={ACCORDIONS_MOCK} />);
		const accordions = blockComponent.find('.c-accordion');

		expect(accordions).toHaveLength(ACCORDIONS_MOCK.length);
	});
});
