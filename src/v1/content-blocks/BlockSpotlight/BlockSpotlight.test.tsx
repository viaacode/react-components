import { mount, shallow } from 'enzyme';
import React from 'react';

import { action } from '../../helpers';
import { testRenderLink } from '../../helpers/render-link';

import { BlockSpotlight } from './BlockSpotlight';
import { MOCK_SPOTLIGHT_PROJECTS } from './BlockSpotlight.mock';

const BlockSpotlightExample = (
	<BlockSpotlight
		elements={MOCK_SPOTLIGHT_PROJECTS}
		renderLink={testRenderLink(action('Clicked on spotlight item'))}
	/>
);

describe('<BlockSpotlight />', () => {
	it('Should be able to render', () => {
		shallow(BlockSpotlightExample);
	});

	it('Should set the correct className', () => {
		const component = mount(BlockSpotlightExample);

		component.debug();

		const mainDiv = component.find('div').at(0);
		const projectPrimary = component.find('div').at(1);
		const projectSecondary1 = component.find('div').at(2);
		const projectSecondary2 = component.find('div').at(3);

		expect(mainDiv.hasClass('c-spotlight')).toEqual(true);
		expect(projectPrimary.hasClass('c-spotlight__item')).toEqual(true);
		expect(projectSecondary1.hasClass('c-spotlight__item')).toEqual(true);
		expect(projectSecondary2.hasClass('c-spotlight__item')).toEqual(true);
	});

	it('Should set the correct title', () => {
		const component = mount(BlockSpotlightExample);

		const titleElement = component.find('p').at(0);

		titleElement.debug();

		expect(titleElement.text()).toEqual('Big item');
	});
});
