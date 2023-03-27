import { storiesOf } from '@storybook/react';
import React from 'react';

import Tooltip from './Tooltip';
import { TooltipContent, TooltipTrigger } from './Tooltip.slots';

storiesOf('components/Tooltip', module)
	.addParameters({ jest: ['Tooltip'] })
	.add('Tooltip top', () => (
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
	))
	.add('Tooltip right', () => (
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
	))
	.add('Tooltip bottom', () => (
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
	))
	.add('Tooltip left', () => (
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
	))
	.add('Tooltip offset', () => (
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
	))
	.add('Tooltip multiple', () => (
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
	))
	.add('Tooltip dynamic position', () => (
		<div>
			<button
				onClick={() => {
					const trigger = document.getElementsByClassName(
						'c-tooltip-component-trigger'
					)?.[0];
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
	));
