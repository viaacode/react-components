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

	const {
		styles,
		attributes,
		update: updatePopperPosition,
	} = usePopper(referenceElement, popperElement, {
		placement: position,
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, offset || 10],
				},
			},
			{
				name: 'computeStyles',
				options: {
					adaptive: false,
				},
			},
			{
				name: 'computeStyles2',
				options: {
					gpuAcceleration: false,
				},
			},
		],
	});

	const handleMouseMove = useCallback(
		async (evt: Event) => {
			const elem = evt.target as HTMLElement;
			let tooltipElem: HTMLElement | null = null;
			if (elem.classList.contains('c-tooltip-component-trigger')) {
				tooltipElem = elem;
			} else if (elem.closest('.c-tooltip-component-trigger')) {
				tooltipElem = elem.closest('.c-tooltip-component-trigger');
			}

			const tempShow = !!tooltipElem && tooltipElem.getAttribute('data-id') === id;
			if (tempShow) {
				await updatePopperPosition?.();
			}
			setShow(tempShow);
		},
		[id, updatePopperPosition]
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
			<div
				className="c-tooltip-component-trigger"
				data-id={id}
				ref={(el) => setReferenceElement(el)}
			>
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
				ref={(el) => setPopperElement(el)}
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
