import { mount, shallow } from 'enzyme';
import React from 'react';

import { action } from '../../helpers';
import { testRenderLink } from '../../helpers/render-link';

import { BlockCTAs } from './BlockCTAs';
import { CTAS_MOCK } from './BlockCTAs.mock';

const renderLink = testRenderLink(action('navigate to'));

describe('<BlockCTAs />', () => {
	it('Should be able to render', () => {
		shallow(<BlockCTAs elements={CTAS_MOCK} renderLink={renderLink} />);
	});

	it('should pass a custom className', () => {
		const customClass = 'c-cta-custom';
		const CTAsComponent = (
			<BlockCTAs className={customClass} elements={CTAS_MOCK} renderLink={renderLink} />
		);

		expect(shallow(CTAsComponent).hasClass(customClass)).toBeTruthy();
	});

	it('Should correctly pass on elements prop', () => {
		const CTAsComponent = mount(<BlockCTAs elements={CTAS_MOCK} renderLink={renderLink} />);

		expect(CTAsComponent.prop('elements')).toEqual(CTAS_MOCK);
	});

	it('Should correctly render CTAs', () => {
		const CTAsComponent = mount(<BlockCTAs elements={CTAS_MOCK} renderLink={renderLink} />);
		const CTAsBlock = CTAsComponent.find('.c-cta');
		const CTAs = CTAsBlock.find('.c-cta-item');

		expect(CTAs).toHaveLength(2);
	});
});
