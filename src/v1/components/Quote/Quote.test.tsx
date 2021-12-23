import { mount, shallow } from 'enzyme';
import React from 'react';

import { Quote } from './Quote';
import { MOCK_QUOTE_WITH_IMG } from './Quote.mock';

const CUSTOM_CLASS = 'c-block-custom';

export const quoteExample = <Quote className={CUSTOM_CLASS} {...MOCK_QUOTE_WITH_IMG} />;

describe('<Quote />', () => {
	it('Should be able to render', () => {
		shallow(quoteExample);
	});

	it('Should render the quote text correctly', () => {
		const component = shallow(quoteExample);

		const quoteElement = component.find('blockquote');

		expect(quoteElement.html()).toContain(`>${MOCK_QUOTE_WITH_IMG.quote}<`);
	});

	it('Should render the author name correctly', () => {
		const component = shallow(quoteExample);

		const spanElement = component.find('span');

		expect(spanElement.html()).toContain(`>${MOCK_QUOTE_WITH_IMG.authorName}<`);
	});

	it('Should set the correct className', () => {
		const component = mount(quoteExample);

		const verticalWrapper = component.find('.o-container-vertical');
		const quoteDivElement = component.find('.c-quote');
		const quoteElement = quoteDivElement.find('blockquote');
		const citeElement = quoteDivElement.find('cite');

		expect(verticalWrapper).toHaveLength(1);
		expect(verticalWrapper.hasClass(CUSTOM_CLASS)).toBeTruthy();
		expect(verticalWrapper.hasClass('o-container-vertical-quote')).toBeTruthy();

		expect(quoteDivElement).toHaveLength(1);
		expect(quoteElement.hasClass('c-quote__text')).toBeTruthy();
		expect(citeElement.hasClass('c-quote__author')).toBeTruthy();
	});
});
