import classnames from 'classnames';
import { flatten } from 'lodash-es';
import React, { FunctionComponent } from 'react';

import { Button, ButtonToolbar, ButtonType, IconName } from '../../components';
import { defaultRenderLinkFunction } from '../../helpers/render-link';
import { AlignOptions, ButtonAction, DefaultProps, RenderLinkFunction } from '../../types';

import './BlockButtons.scss';

export interface ButtonProps extends DefaultProps {
	active?: boolean;
	ariaLabel?: string;
	arrow?: boolean;
	autoHeight?: boolean;
	block?: boolean;
	disabled?: boolean;
	icon?: IconName;
	label?: string;
	altTitle?: string;
	size?: 'small';
	title?: string;
	tooltip?: string;
	type?: ButtonType;
	buttonAction: ButtonAction;
}

export interface BlockButtonsProps extends DefaultProps {
	elements: ButtonProps[];
	align?: AlignOptions;
	hasDividers?: boolean;
	renderLink?: RenderLinkFunction;
}

export const BlockButtons: FunctionComponent<BlockButtonsProps> = ({
	className,
	elements,
	align = 'left',
	hasDividers = false,
	renderLink = defaultRenderLinkFunction,
}) => (
	<ButtonToolbar
		className={classnames(className, 'c-block-buttons', `u-content-flex--${align}`, {
			'c-block-buttons__dividers': hasDividers,
		})}
	>
		{flatten(
			elements.map((button, index) => {
				const nodes = [
					<div key={`buttons_block_${button.label}`}>
						{renderLink(
							button.buttonAction,
							<Button key={`button-${index}`} type="secondary" {...button} />,
							button.label || button.ariaLabel || button.tooltip,
							button.altTitle || button.label || button.ariaLabel || button.tooltip
						)}
					</div>,
				];
				if (hasDividers && index !== elements.length - 1) {
					nodes.push(
						<span
							className="c-block-buttons__divider"
							key={`buttons_block_${button.label}_divider`}
						/>
					);
				}
				return nodes;
			})
		)}
	</ButtonToolbar>
);
