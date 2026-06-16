import clsx from 'clsx';
import {
	type CSSProperties,
	type FunctionComponent,
	type ReactNode,
	useRef,
	useState,
} from 'react';

import { useSlot } from '../../hooks/use-slot';
import { generateRandomId } from '../../utils/generate-random-id/generate-random-id';

import './Tooltip.scss';
import {
	arrow,
	autoUpdate,
	FloatingArrow,
	offset as floatingOffset,
	type Placement,
	safePolygon,
	useClick,
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
	style?: CSSProperties;
	arrowFillColor?: string; // https://floating-ui.com/docs/floatingarrow#fill
	arrowStrokeColor?: string; // https://floating-ui.com/docs/floatingarrow#stroke
	arrowStrokeWidth?: number; // https://floating-ui.com/docs/FloatingArrow#strokewidth
}

const Tooltip: FunctionComponent<TooltipPropsSchema> = ({
	children,
	position = 'top',
	offset = 10,
	contentClassName,
	style,
	arrowFillColor = '#FFF',
	arrowStrokeColor,
	arrowStrokeWidth = 0,
}) => {
	const [show, setShow] = useState(false);
	const [id] = useState(generateRandomId());

	const triggerElement = useSlot(TooltipTrigger, children);
	const contentElement = useSlot(TooltipContent, children);
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

	const hover = useHover(context, {
		handleClose: safePolygon({
			requireIntent: false,
			buffer: offset,
		}),
	});
	const focus = useFocus(context);
	const click = useClick(context, {keyboardHandlers: false });
	const { getFloatingProps, getReferenceProps } = useInteractions([
		hover,
		focus,
		click,
	]);

	return contentElement && triggerElement ? (
		<>
			<div
				className="c-tooltip-component-trigger"
				data-id={id}
				ref={refs.setReference}
				{...getReferenceProps()}
			>
				{triggerElement}
			</div>

			{show && (
				<div
					className={clsx(
						contentClassName,
						'c-tooltip-component',
						`c-tooltip-component--${position}`
					)}
					ref={refs.setFloating}
					style={{ ...floatingStyles, ...style }}
					{...getFloatingProps()}
				>
					{contentElement}
					<FloatingArrow
						ref={arrowRef}
						context={context}
						className="c-tooltip-component__arrow"
						fill={arrowFillColor}
						stroke={arrowStrokeColor}
						strokeWidth={arrowStrokeWidth}
					/>
				</div>
			)}
		</>
	) : null;
};

export default Tooltip;
