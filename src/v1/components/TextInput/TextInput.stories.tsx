import { storiesOf } from '@storybook/react';
import React, { cloneElement, Fragment, ReactElement, useState } from 'react';

import { action } from '../../helpers';
import { Spacer } from '../Spacer/Spacer';

import { TextInput } from './TextInput';

const TextInputStoryComponent = ({
	children,
	defaultValue = '',
}: {
	children: ReactElement;
	defaultValue?: string;
}) => {
	const [value, setValue] = useState(defaultValue);

	return cloneElement(children, {
		value,
		onChange: (value: string) => {
			action('Input changed')(value);
			setValue(value);
		},
	});
};

storiesOf('v1/components/TextInput', module)
	.addParameters({ jest: ['TextInput'] })
	.add('TextInput', () => (
		<Fragment>
			<Spacer margin="bottom">
				<TextInputStoryComponent>
					<TextInput
						type="email"
						placeholder="Enter your email..."
						onChange={action('onChange')}
						onBlur={action('onBlur')}
						onKeyUp={action('onkeyup')}
					/>
				</TextInputStoryComponent>
			</Spacer>
			<Spacer margin="bottom">
				<TextInputStoryComponent>
					<TextInput
						type="password"
						placeholder="Enter your password..."
						onChange={action('onChange')}
					/>
				</TextInputStoryComponent>
			</Spacer>
			<TextInputStoryComponent>
				<TextInput disabled placeholder="No typing here..." />
			</TextInputStoryComponent>
		</Fragment>
	))
	.add('TextInput without placeholder', () => (
		<Fragment>
			<Spacer margin="bottom">
				<TextInputStoryComponent>
					<TextInput onChange={action('onChange')} />
				</TextInputStoryComponent>
			</Spacer>
			<TextInputStoryComponent>
				<TextInput disabled />
			</TextInputStoryComponent>
		</Fragment>
	))
	.add('TextInput with default value', () => (
		<Fragment>
			<Spacer margin="bottom">
				<TextInputStoryComponent>
					<TextInput
						placeholder="And this is the placeholder"
						value="This is the default value"
						onChange={action('onChange')}
					/>
				</TextInputStoryComponent>
			</Spacer>
			<TextInputStoryComponent defaultValue="This is the default value">
				<TextInput disabled />
			</TextInputStoryComponent>
		</Fragment>
	))
	.add('TextInput with icon', () => (
		<Fragment>
			<Spacer margin="bottom">
				<TextInputStoryComponent>
					<TextInput
						icon="search"
						placeholder="Type something here..."
						onChange={action('onChange')}
					/>
				</TextInputStoryComponent>
			</Spacer>
			<TextInputStoryComponent>
				<TextInput icon="x" disabled placeholder="No typing here..." />
			</TextInputStoryComponent>
		</Fragment>
	));
