import clsx from 'clsx';
import {
	type FunctionComponent,
	type ReactNode,
	useRef,
	useState,
} from 'react';

import { useSlot } from '../../hooks/use-slot';

import './Tooltip.scss';
import {
	arrow,
	autoUpdate,
	FloatingArrow,
	offset as floatingOffset,
	type Placement,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
} from '@floating-ui/react';
import { TooltipContent, TooltipTrigger } from './Tooltip.slots';

interface TooltipPropsSchema {
	children: ReactNode;
	position: Placement;
	offset?: number;
	contentClassName?: string;
}

const Tooltip: FunctionComponent<TooltipPropsSchema> = ({
	children,
	position = 'top',
	offset = 10,
	contentClassName,
}) => {
	const [show, setShow] = useState(false);

	const tooltipSlot = useSlot(TooltipContent, children);
	const triggerSlot = useSlot(TooltipTrigger, children);
	const arrowRef = useRef(null);

	const { refs, floatingStyles, context } = useFloating({
		open: show,
		onOpenChange: setShow,
		placement: position,
		middleware: [
			floatingOffset({ mainAxis: offset }),
			arrow({
				element: arrowRef,
			}),
		],
		whileElementsMounted: autoUpdate,
	});

	const hover = useHover(context);
	const focus = useFocus(context);
	const { getFloatingProps, getReferenceProps } = useInteractions([hover, focus]);

	return tooltipSlot && triggerSlot ? (
		<>
			<div className="c-tooltip-component-trigger" ref={refs.setReference} {...getReferenceProps()}>
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
				<FloatingArrow
					ref={arrowRef}
					context={context}
					className="c-tooltip-component__arrow"
					fill="green"
					stroke="red"
				/>
			</div>
		</>
	) : null;
};

export default Tooltip;
