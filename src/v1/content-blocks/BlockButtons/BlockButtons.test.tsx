import { mount, shallow } from 'enzyme';
import React from 'react';

import { defaultRenderLinkFunction } from '../../helpers/render-link';

import { BlockButtons } from './BlockButtons';
import { BUTTONS_MOCK } from './BlockButtons.mock';

describe('<BlockButtons />', () => {
	it('Should be able to render', () => {
		shallow(<BlockButtons elements={BUTTONS_MOCK} renderLink={defaultRenderLinkFunction} />);
	});

	it('should pass a custom className', () => {
		const customClass = 'c-buttons-custom';
		const ButtonsComponent = (
			<BlockButtons
				className={customClass}
				elements={BUTTONS_MOCK}
				renderLink={defaultRenderLinkFunction}
			/>
		);

		expect(shallow(ButtonsComponent).hasClass(customClass)).toBeTruthy();
	});

	it('Should correctly pass on elements prop', () => {
		const ButtonsComponent = mount(
			<BlockButtons elements={BUTTONS_MOCK} renderLink={defaultRenderLinkFunction} />
		);

		expect(ButtonsComponent.prop('elements')).toEqual(BUTTONS_MOCK);
	});

	it('Should correctly render Buttons', () => {
		const ButtonsComponent = mount(
			<BlockButtons elements={BUTTONS_MOCK} renderLink={defaultRenderLinkFunction} />
		);
		const buttonToolbar = ButtonsComponent.find('.c-button-toolbar');
		const buttons = buttonToolbar.find('.c-button');

		expect(buttons).toHaveLength(2);
	});
});
