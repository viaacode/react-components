import React from 'react';

import { shallow } from 'enzyme';
import { loremIpsum } from 'lorem-ipsum';

import { BlockQuote } from './BlockQuote';

const customClass = 'c-block-custom';
const quoteText = loremIpsum({ count: 10 });
const authorAvatarSource = '/images/50x50.svg';
const authorName = loremIpsum({ count: 2 });

export const quoteExample = (
	<BlockQuote
		className={customClass}
		quoteText={quoteText}
		authorAvatarSource={authorAvatarSource}
		authorName={authorName}
	/>
);

describe('<BlockQuote />', () => {
	it('Should be able to render', () => {
		shallow(quoteExample);
	});

	it('Should render the quote text correctly', () => {
		const component = shallow(quoteExample);

		const blockQuoteElement = component.find('blockquote');

		expect(blockQuoteElement.html()).toContain(`>${quoteText}<`);
	});

	it('Should render the avatar correctly', () => {
		const component = shallow(quoteExample);

		const imgElement = component.find('img');

		expect(imgElement.prop('src')).toEqual(authorAvatarSource);
	});

	it('Should render the author name correctly', () => {
		const component = shallow(quoteExample);

		const spanElement = component.find('span');

		expect(spanElement.html()).toContain(`>${authorName}<`);
	});

	it('Should set the correct className', () => {
		const component = shallow(quoteExample);

		const quoteDivElement = component.childAt(0);
		const blockquoteElement = quoteDivElement.find('blockquote');
		const citeElement = quoteDivElement.find('cite');

		expect(component.hasClass(customClass)).toEqual(true);
		expect(component.hasClass('o-container-vertical')).toEqual(true);
		expect(component.hasClass('o-container-vertical-quote')).toEqual(true);

		expect(quoteDivElement.hasClass('c-quote')).toEqual(true);

		expect(blockquoteElement.hasClass('c-quote__text')).toEqual(true);

		expect(citeElement.hasClass('c-quote__author')).toEqual(true);
	});
});
