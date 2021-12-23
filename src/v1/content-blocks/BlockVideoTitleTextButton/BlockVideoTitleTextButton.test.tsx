import { mount, shallow } from 'enzyme';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { MOCK_FLOW_PLAYER_PROPS_FULL } from '../../components/FlowPlayer/FlowPlayer.mock';

import { BlockVideoTitleTextButton } from './BlockVideoTitleTextButton';

const customClass = 'c-block-custom';
const loremIpsumText = loremIpsum({ count: 10 });

const titleLink = 'http://google.com?q=title';
const blockVideoTitleTextButtonExample = (
	<BlockVideoTitleTextButton
		className={customClass}
		flowPlayerProps={MOCK_FLOW_PLAYER_PROPS_FULL}
		title="Title"
		titleLink={titleLink}
		text={loremIpsumText}
	/>
);

describe('<BlockVideoTitleTextButton />', () => {
	it('Should be able to render', () => {
		shallow(blockVideoTitleTextButtonExample);
	});

	it('Should render the title correctly', () => {
		const component = mount(blockVideoTitleTextButtonExample);

		const h2Element = component.find('h2');

		expect(h2Element.html()).toContain(`>Title<`);
	});

	it('Should render the title link correctly', () => {
		const component = mount(blockVideoTitleTextButtonExample);

		const anchorElement = component.find('a');

		expect(anchorElement.prop('href')).toEqual(titleLink);
	});

	it('Should render the text correctly', () => {
		const component = mount(blockVideoTitleTextButtonExample);

		const pElement = component.find('p');

		expect(pElement.html()).toContain(`>${loremIpsumText}<`);
	});
});
