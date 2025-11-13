import type { Meta, StoryObj } from '@storybook/react-vite';

import Tooltip from './Tooltip';
import { TooltipContent, TooltipTrigger } from './Tooltip.slots';

const meta: Meta<typeof Tooltip> = {
	title: 'Components/Tooltip',
	component: Tooltip,
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const TooltipTop: Story = {
	render: () => (
		<div className="u-text-center" style={{ paddingTop: '80px' }}>
			<Tooltip position="top">
				<TooltipTrigger>
					<span>Hover me!</span>
				</TooltipTrigger>
				<TooltipContent>
					<span>This is a tooltip</span>
				</TooltipContent>
			</Tooltip>
		</div>
	),
};

export const TooltipRight: Story = {
	render: () => (
		<div className="u-text-center">
			<Tooltip position="right">
				<TooltipTrigger>
					<span>Hover me!</span>
				</TooltipTrigger>
				<TooltipContent>
					<span>This is a tooltip</span>
				</TooltipContent>
			</Tooltip>
		</div>
	),
};

export const TooltipBottom: Story = {
	render: () => (
		<div className="u-text-center">
			<Tooltip position="bottom">
				<TooltipTrigger>
					<span>Hover me!</span>
				</TooltipTrigger>
				<TooltipContent>
					<span>This is a tooltip</span>
				</TooltipContent>
			</Tooltip>
		</div>
	),
};

export const TooltipLeft: Story = {
	render: () => (
		<div className="u-text-center" style={{ paddingLeft: '180px' }}>
			<Tooltip position="left">
				<TooltipTrigger>
					<span>Hover me!</span>
				</TooltipTrigger>
				<TooltipContent>
					<span>This is a tooltip</span>
				</TooltipContent>
			</Tooltip>
		</div>
	),
};

export const TooltipOffset: Story = {
	render: () => (
		<>
			<div className="u-text-center">
				<Tooltip position="right">
					<TooltipTrigger>
						<span>Hover me!</span>
					</TooltipTrigger>
					<TooltipContent>
						<span>standard offset</span>
					</TooltipContent>
				</Tooltip>
			</div>
			<div className="u-text-center">
				<Tooltip position="right" offset={60}>
					<TooltipTrigger>
						<span>Hover me!</span>
					</TooltipTrigger>
					<TooltipContent>
						<span>60 px offset</span>
					</TooltipContent>
				</Tooltip>
			</div>
		</>
	),
};

export const TooltipMultiple: Story = {
	render: () => (
		<>
			<div className="u-text-center">
				<Tooltip position="right">
					<TooltipTrigger>
						<span>Foo</span>
					</TooltipTrigger>
					<TooltipContent>
						<span>Bar</span>
					</TooltipContent>
				</Tooltip>
			</div>
			<div className="u-text-center">
				<Tooltip position="right">
					<TooltipTrigger>
						<span>Marco</span>
					</TooltipTrigger>
					<TooltipContent>
						<span>Polo</span>
					</TooltipContent>
				</Tooltip>
			</div>
		</>
	),
};

export const TooltipDynamicPosition: Story = {
	render: () => (
		<div>
			<button
				type="button"
				onClick={() => {
					const trigger = document.getElementsByClassName('c-tooltip-component-trigger')?.[0];
					if (trigger) {
						(trigger as HTMLElement).style.marginLeft = '400px';
					}
				}}
			>
				Move tooltip trigger
			</button>
			<br />
			<br />
			<br />
			<Tooltip position="right">
				<TooltipTrigger>
					<span>Foo</span>
				</TooltipTrigger>
				<TooltipContent>
					<span>Bar</span>
				</TooltipContent>
			</Tooltip>
		</div>
	),
};
