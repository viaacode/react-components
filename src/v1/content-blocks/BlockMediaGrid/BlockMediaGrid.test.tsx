import { mount, shallow } from 'enzyme';
import React from 'react';

import { BlockMediaGrid } from './BlockMediaGrid';
import { MEDIA_LIST_CTA_MOCK, MEDIA_LIST_MOCK } from './BlockMediaGrid.mock';

describe('<BlockMediaGrid />', () => {
	const customClass = 'c-custom-block';
	const BlockMediaGridComponent = <BlockMediaGrid className={customClass} {...MEDIA_LIST_MOCK} />;

	it('Should be able to render', () => {
		shallow(BlockMediaGridComponent);
	});

	it('Should pass a custom className', () => {
		const blockMediaGrid = shallow(BlockMediaGridComponent);

		expect(blockMediaGrid.hasClass(customClass)).toBeTruthy();
	});

	it('Should correctly pass on `elements` prop', () => {
		const blockMediaGrid = mount(BlockMediaGridComponent);
		const mediaCardItems = blockMediaGrid.find('.c-media-card');
		const mediaCardTitle = mediaCardItems.at(3).find('.c-media-card__title');

		expect(mediaCardItems).toHaveLength(MEDIA_LIST_MOCK.elements.length);
		expect(mediaCardTitle.text()).toBe(MEDIA_LIST_MOCK.elements[3].title);
	});

	it('Should correctly render a CTA when given', () => {
		const blockMediaGrid = mount(<BlockMediaGrid {...MEDIA_LIST_CTA_MOCK} />);

		const ctaItem = blockMediaGrid.find('.c-cta-item');
		const ctaButtonLabel = ctaItem.find('.c-cta__content .c-button__label');

		expect(ctaItem).toHaveLength(1);
		expect(ctaButtonLabel.text()).toBe(MEDIA_LIST_CTA_MOCK.ctaButtonLabel);
	});
});
