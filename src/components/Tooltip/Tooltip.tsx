import clsx from 'clsx';
import { type FunctionComponent, type ReactNode, useCallback, useEffect, useState } from 'react';

import { useSlot } from '../../hooks/use-slot';
import { generateRandomId } from '../../utils/generate-random-id/generate-random-id';

import './Tooltip.scss';
import {
	autoUpdate,
	offset as floatingOffset,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
} from '@floating-ui/react';
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
	const [show, setShow] = useState(false);
	const [id] = useState(generateRandomId());

	const tooltipSlot = useSlot(TooltipContent, children);
	const triggerSlot = useSlot(TooltipTrigger, children);

	const { refs, floatingStyles, context } = useFloating({
		placement: position,
		middleware: [floatingOffset({ mainAxis: offset })],
		whileElementsMounted: autoUpdate,
	});

	const hover = useHover(context);
	const focus = useFocus(context);
	const { getFloatingProps, getReferenceProps } = useInteractions([hover, focus]);

	const handleMouseMove = useCallback(
		async (evt: Event) => {
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
			<div
				className="c-tooltip-component-trigger"
				data-id={id}
				ref={refs.setReference}
				{...getReferenceProps()}
			>
				{triggerSlot}
			</div>

			<div
				className={clsx(
					contentClassName,
					'c-tooltip-component',
					`c-tooltip-component--${position}`,
					{
						'c-tooltip-component--show': show,
					}
				)}
				ref={refs.setFloating}
				style={floatingStyles}
				{...getFloatingProps()}
			>
				{tooltipSlot}
				<div className="c-tooltip-component__arrow" data-popper-arrow />
			</div>
		</>
	) : null;
};

export default Tooltip;
