import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { IconNameSchema } from '../Icon/Icon.types';
import { Spinner } from '../Spinner/Spinner';

import './Alert.scss';
import { AlertPropsSchema, AlertTypeWithIcon } from './Alert.types';

/* eslint-disable @typescript-eslint/no-unused-vars */
const ALERT_TYPE_TO_ICON_MAPPING: { [type in AlertTypeWithIcon]: IconNameSchema } = {
	/* eslint-enable @typescript-eslint/no-unused-vars */
	info: 'circle-info',
	success: 'circle-check',
	danger: 'circle-warning',
};

export const Alert: FunctionComponent<AlertPropsSchema> = ({
	children,
	className,
	dark = false,
	message = '',
	onClose,
	type = 'info',
}) => {
	return (
		<div
			className={classnames(className, 'c-alert', {
				'c-alert--dark': dark,
				[`c-alert--${type}`]: type,
			})}
		>
			<div className="c-alert__body">
				{type === 'spinner' ? (
					<Spinner light={dark} />
				) : (
					<Icon name={ALERT_TYPE_TO_ICON_MAPPING[type]} type="multicolor" />
				)}
				<div className="c-alert__message">{message || children}</div>
			</div>
			{!!onClose && (
				<Button
					icon="close"
					type={dark ? 'borderless-i' : 'borderless'}
					onClick={onClose || (() => null)}
				/>
			)}
		</div>
	);
};
