import { storiesOf } from '@storybook/react';
import React from 'react';

import { action } from '../../helpers';
import { Box } from '../Box/Box';
import { Spacer } from '../Spacer/Spacer';

import { Alert } from './Alert';
import { AlertPropsSchema, AlertTypeSchema } from './Alert.types';

function getMultiLineAlertMessage(type: string) {
	return (
		<>
			{type} alert message
			<br />
			{type} alert message
			<br />
			{type} alert message
			<br />
		</>
	);
}

function renderAlertStories(props?: AlertPropsSchema, message?: (type: string) => JSX.Element) {
	const types: AlertTypeSchema[] = ['info', 'success', 'danger', 'spinner'];

	return (
		<>
			{types.map((type, i) => (
				<Spacer key={`${type}-${i}`} margin="bottom">
					<Alert
						{...props}
						message={message ? message(type) : `${type} alert message`}
						type={type}
						onClose={type === 'info' ? action('alert closed') : () => null}
					/>
				</Spacer>
			))}
		</>
	);
}

storiesOf('v1/components/Alert', module)
	.addParameters({ jest: ['Alert'] })
	.add('Alerts', () => <Box backgroundColor="dark">{renderAlertStories()}</Box>)
	.add('Alerts multiline', () => renderAlertStories({}, getMultiLineAlertMessage))
	.add('Dark alerts', () => renderAlertStories({ dark: true }))
	.add('Alerts custom content', () => (
		<Alert>
			<span>
				Info alert message <a href="#alert">with link</a>
			</span>
		</Alert>
	))
	.add('Alerts heading', () => (
		<Alert>
			<span className="c-content">
				<h4>Test heading</h4>
				Heading should not have any margin top
			</span>
		</Alert>
	));
