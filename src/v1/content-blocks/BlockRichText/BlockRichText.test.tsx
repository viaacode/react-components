import { mount, shallow } from 'enzyme';
import React from 'react';

import { BlockRichText } from './BlockRichText';
import { RICH_TEXT_MOCK } from './BlockRichText.mock';

const customClass = 'c-block-custom';

const SingleColumnExample = <BlockRichText className={customClass} elements={RICH_TEXT_MOCK} />;
const TwoColumnExample = (
	<BlockRichText className={customClass} elements={[RICH_TEXT_MOCK, RICH_TEXT_MOCK]} />
);

describe('<BlockRichText />', () => {
	it('Should be able to render', () => {
		shallow(SingleColumnExample);
	});

	it('Should render the markdown correctly', () => {
		const component = mount(SingleColumnExample);

		const html = component.html();
		expect(html).toContain('>Title</h1>');
		expect(html).toContain('<p>');
		expect(html).toContain('<ul>');
		expect(html).toContain('<li>one</li>');
		expect(html).toContain('<li>two</li>');
		expect(html).toContain('<li>three</li>');
		expect(html).toContain('<li>1</li>');
		expect(html).toContain('<li>2</li>');
		expect(html).toContain('<li>3</li>');
	});

	it('Should set the correct className', () => {
		const component = mount(SingleColumnExample);

		const contentContainer = component.find('.c-content');

		expect(component.hasClass(customClass)).toEqual(true);

		expect(contentContainer).toHaveLength(1);
	});

	it('Should create multiple columns', () => {
		const component = mount(TwoColumnExample);

		expect(component.find('.c-content')).toHaveLength(2);
	});
});
