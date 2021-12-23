import classnames from 'classnames';
import React, { FunctionComponent, useEffect } from 'react';

import { Button, ButtonPropsSchema } from '../../components/Button/Button';
import { AlignOptions, DefaultProps } from '../../types';

import './BlockEventbrite.scss';

export interface BlockEventbriteProps extends DefaultProps, ButtonPropsSchema {
	eventId: string;
	align?: AlignOptions;
	className?: string;
}

const EVENTBRITE_SCRIPT_ID = 'eventbriteWidgetsScript';

export const BlockEventbrite: FunctionComponent<BlockEventbriteProps> = ({
	eventId,
	align = 'center',
	className,
	...rest
}) => {
	const elementId = `eventbrite-widget-modal-trigger-${eventId}`;

	useEffect(() => {
		const existingScript = document.getElementById(EVENTBRITE_SCRIPT_ID);
		if (!existingScript) {
			const script = document.createElement('script');
			script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
			script.id = EVENTBRITE_SCRIPT_ID;
			document.body.appendChild(script);

			script.onload = () => {
				(window as any).EBWidgets.createWidget({
					eventId,
					widgetType: 'checkout',
					modal: true,
					modalTriggerElementId: elementId,
				});
			};
		}
	}, [elementId, eventId]);

	return (
		<div
			className={classnames(
				className,
				'c-block-eventbrite',
				`c-block-eventbrite__align-${align}`
			)}
		>
			<Button {...rest} id={elementId} />
		</div>
	);
};
