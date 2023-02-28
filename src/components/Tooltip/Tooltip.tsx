import classnames from 'classnames';
import React, { FunctionComponent, ReactNode, useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';

import { useSlot } from '../../hooks/use-slot';
import { generateRandomId } from '../../utils/generate-random-id/generate-random-id';

import './Tooltip.scss';
import { TooltipContent, TooltipTrigger } from './Tooltip.slots';

export interface TooltipPropsSchema {
	children: ReactNode;
	position: 'top' | 'right' | 'bottom' | 'left';
	offset?: number;
	contentClassName?: string;
}

const Tooltip: FunctionComponent<TooltipPropsSchema> = ({
	children,
	position = 'bottom',
	offset,
	contentClassName,
}) => {
	const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
	const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

	const [show, setShow] = useState(false);
	const [id] = useState(generateRandomId());

	const tooltipSlot = useSlot(TooltipContent, children);
	const triggerSlot = useSlot(TooltipTrigger, children);

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: position,
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, offset || 10],
				},
			},
		],
	});

	const handleMouseMove = useCallback(
		(evt: Event) => {
			const elem = evt.target as HTMLElement;
			let tooltipElem: HTMLElement | null = null;
			if (elem.classList.contains('c-tooltip-component-trigger')) {
				tooltipElem = elem;
			} else if (elem.closest('.c-tooltip-component-trigger')) {
				tooltipElem = elem.closest('.c-tooltip-component-trigger');
			}
			setShow(!!tooltipElem && tooltipElem.getAttribute('data-id') === id);
		},
		[id]
	);

	useEffect(() => {
		document.body.addEventListener('mousemove', handleMouseMove);
		document.body.addEventListener('touch', handleMouseMove);

		return () => {
			document.body.removeEventListener('mousemove', handleMouseMove);
			document.body.removeEventListener('touch', handleMouseMove);
		};
	}, [handleMouseMove]);

	return tooltipSlot && triggerSlot ? (
		<>
			<div className="c-tooltip-component-trigger" data-id={id} ref={setReferenceElement}>
				{triggerSlot}
			</div>

			<div
				className={classnames(
					contentClassName,
					'c-tooltip-component',
					`c-tooltip-component--${position}`,
					{
						'c-tooltip-component--show': show,
					}
				)}
				ref={setPopperElement}
				style={styles.popper}
				{...attributes.popper}
			>
				{tooltipSlot}
				<div className="c-tooltip-component__arrow" data-popper-arrow />
			</div>
		</>
	) : null;
};

export default Tooltip;
