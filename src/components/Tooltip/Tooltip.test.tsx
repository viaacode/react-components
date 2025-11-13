import { fireEvent, render, screen } from '@testing-library/react';

import Tooltip from './Tooltip';
import { TooltipContent, TooltipTrigger } from './Tooltip.slots';

const contentText = 'This is a tooltip';
const triggerText = 'Hover me!';
const tooltipPlacement = 'bottom';

const renderTooltip = () =>
	render(
		<Tooltip position={tooltipPlacement}>
			<TooltipTrigger>
				<span className="trigger">{triggerText}</span>
			</TooltipTrigger>
			<TooltipContent>
				<span className="content">{contentText}</span>
			</TooltipContent>
		</Tooltip>
	);

describe('Tooltip', () => {
	it('should render', () => {
		const { container } = renderTooltip();

		const tooltip = container.querySelector('.c-tooltip-component');
		expect(tooltip).toBeInTheDocument();
	});

	it('should display the tooltip trigger with the correct text', () => {
		const { container, getByText } = renderTooltip();

		const triggerElement = container.querySelector('.trigger');
		const triggerElementContent = getByText(triggerText);

		expect(triggerElement).toBeInTheDocument();
		expect(triggerElementContent).toBeInTheDocument();
	});

	it('should set the correct placement className', () => {
		const { container } = renderTooltip();

		const tooltipElement = container.querySelector(`.c-tooltip-component--${tooltipPlacement}`);
		expect(tooltipElement).toBeInTheDocument();
	});

	it('should show the tooltip when hovered', () => {
		const { container } = renderTooltip();
		const triggerComponent = container.getElementsByTagName('span')[0];

		fireEvent.mouseOver(triggerComponent);

		expect(screen.getByText(contentText)).toBeInTheDocument();
	});
});
