import { fireEvent, render, screen } from '@testing-library/react';

import Tooltip from './Tooltip';
import { TooltipContent, TooltipTrigger } from './Tooltip.slots';

const contentText = 'This is a tooltip';
const triggerText = 'Hover me!';
const tooltipPlacement = 'bottom';

const renderTooltip = (props: { enableTooltipOnClick?: boolean } = {}) =>
	render(
		<Tooltip position={tooltipPlacement} {...props}>
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

	it('should show the tooltip when the trigger is clicked by default', () => {
		const { container } = renderTooltip();

		fireEvent.click(container.getElementsByTagName('span')[0]);

		expect(screen.getByText(contentText)).toBeInTheDocument();
	});

	describe('with enableTooltipOnClick set to false', () => {
		it('should not show the tooltip when the trigger is clicked', () => {
			const { container } = renderTooltip({ enableTooltipOnClick: false });

			fireEvent.click(container.getElementsByTagName('span')[0]);

			expect(screen.queryByText(contentText)).not.toBeInTheDocument();
		});

		it('should still show the tooltip when hovered', () => {
			const { container } = renderTooltip({ enableTooltipOnClick: false });
			const wrapper = container.querySelector('.c-tooltip-component-trigger') as HTMLElement;

			fireEvent.pointerEnter(wrapper);
			fireEvent.mouseMove(wrapper);

			expect(screen.getByText(contentText)).toBeInTheDocument();
		});

		it('should still show the tooltip when the trigger is focused with the keyboard', () => {
			const { container } = render(
				<Tooltip position={tooltipPlacement} enableTooltipOnClick={false}>
					<TooltipTrigger>
						<button type="button">{triggerText}</button>
					</TooltipTrigger>
					<TooltipContent>
						<span>{contentText}</span>
					</TooltipContent>
				</Tooltip>
			);

			fireEvent.keyDown(document.body, { key: 'Tab' });
			fireEvent.focus(container.getElementsByTagName('button')[0]);

			expect(screen.getByText(contentText)).toBeInTheDocument();
		});
	});
});
