import classnames from 'classnames';
import React, { FunctionComponent, useState } from 'react';

import { useSlot } from '../../hooks/useSlot';
import { DefaultProps } from '../../types';
import { Icon } from '../Icon/Icon';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarLeft, ToolbarRight } from '../Toolbar/Toolbar.slots';
import { ToolbarItem } from '../Toolbar/ToolbarItem/ToolbarItem';

import './Accordion.scss';
import { AccordionActions, AccordionBody, AccordionTitle } from './Accordion.slots';

export interface AccordionPropsSchema extends DefaultProps {
	isOpen?: boolean;
	onToggle?: () => void; // If undefined, the accordion will be able to toggle itself
	title?: string;
}

export const Accordion: FunctionComponent<AccordionPropsSchema> = ({
	children,
	className,
	isOpen = true,
	onToggle,
	title,
}) => {
	const titleSlot = useSlot(AccordionTitle, children);
	const actionsSlot = useSlot(AccordionActions, children);
	const bodySlot = useSlot(AccordionBody, children);

	const [isOpenSelf, setIsOpenSelf] = useState<boolean>(isOpen);

	const hasSlots = !!titleSlot || !!actionsSlot || !!bodySlot;

	const getIsOpen = () => {
		return onToggle ? isOpen : isOpenSelf;
	};

	const accordionIcon = getIsOpen() ? 'chevron-up' : 'chevron-down';

	const handleToggle = () => {
		if (onToggle) {
			onToggle();
		} else {
			setIsOpenSelf(!isOpenSelf);
		}
	};

	return (
		<div
			className={classnames(className, 'c-accordion', {
				'c-accordion--closed': !getIsOpen(),
			})}
		>
			<div
				className={classnames('c-accordion__header', 'u-clickable')}
				onClick={handleToggle}
			>
				<Toolbar autoHeight>
					<ToolbarLeft>
						<ToolbarItem>
							<div className="c-accordion__header-title">{titleSlot || title}</div>
						</ToolbarItem>
					</ToolbarLeft>
					<ToolbarRight>
						<ToolbarItem>
							<div onClick={(evt) => evt.stopPropagation()}>{actionsSlot}</div>
						</ToolbarItem>
						<ToolbarItem>
							<div className="c-accordion__icon">
								<Icon name={accordionIcon} type="arrows" />
							</div>
						</ToolbarItem>
					</ToolbarRight>
				</Toolbar>
			</div>
			<div className="c-accordion__body">
				<div className="c-accordion__item">{hasSlots ? bodySlot : children}</div>
			</div>
		</div>
	);
};
