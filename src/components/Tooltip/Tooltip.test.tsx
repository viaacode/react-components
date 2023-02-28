import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { Tooltip } from './Tooltip';
import { TooltipContent, TooltipTrigger } from './Tooltip.slots';

describe('Tooltip', () => {
	const contentText = 'This is a tooltip';
	const triggerText = 'Hover me!';
	const tooltipPlacement = 'bottom';

	const tooltip = (
		<Tooltip position={tooltipPlacement}>
			<TooltipTrigger>
				<span className="trigger">{triggerText}</span>
			</TooltipTrigger>
			<TooltipContent>
				<span className="content">{contentText}</span>
			</TooltipContent>
		</Tooltip>
	);

	it('should render', () => {
		shallow(tooltip);
	});

	it('should display the tooltip trigger', () => {
		const triggerElement = mount(tooltip).find('.trigger');

		expect(triggerElement).toHaveLength(1);
		expect(triggerElement.text()).toEqual(triggerText);
	});

	it('should set the correct placement className', () => {
		const tooltipElement = mount(tooltip).find('.c-tooltip-component');

		expect(tooltipElement.hasClass(`c-tooltip-component--${tooltipPlacement}`)).toBeTruthy();
	});

	it('should show the tooltip when hovered', () => {
		const wrapper = mount(tooltip);
		const triggerComponent = wrapper.find('span').first();
		const triggerNode = triggerComponent.getDOMNode();

		act(() => {
			triggerNode.dispatchEvent(new Event('mouseover'));
		});

		triggerComponent.simulate('mouseover');

		expect(
			wrapper.find('.c-tooltip-component').hasClass('c-tooltip-component--show')
		).toBeTruthy();
	});
});
