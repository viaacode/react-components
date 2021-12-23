import { storiesOf } from '@storybook/react';
import React, { cloneElement, Fragment, ReactElement, useState } from 'react';

import { action } from '../../helpers';
import { Spacer } from '../Spacer/Spacer';

import { TextArea } from './TextArea';

const TextAreaStoryComponent = ({
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
			action('TextArea changed')(value);
			setValue(value);
		},
	});
};

storiesOf('v1/components/TextArea', module)
	.addParameters({ jest: ['TextArea'] })
	.add('TextArea', () => (
		<Fragment>
			<Spacer margin="bottom">
				<TextAreaStoryComponent>
					<TextArea placeholder="Type something here..." />
				</TextAreaStoryComponent>
			</Spacer>
			<TextAreaStoryComponent>
				<TextArea disabled placeholder="No typing here..." />
			</TextAreaStoryComponent>
		</Fragment>
	))
	.add('TextArea heights', () => (
		<Fragment>
			<Spacer margin="bottom">
				<TextAreaStoryComponent>
					<TextArea placeholder="An autosizing TextArea" height="auto" />
				</TextAreaStoryComponent>
			</Spacer>
			<Spacer margin="bottom">
				<TextAreaStoryComponent>
					<TextArea placeholder="A small TextArea" height="small" />
				</TextAreaStoryComponent>
			</Spacer>
			<Spacer margin="bottom">
				<TextAreaStoryComponent>
					<TextArea placeholder="A medium TextArea" height="medium" />
				</TextAreaStoryComponent>
			</Spacer>
			<Spacer margin="bottom">
				<TextAreaStoryComponent>
					<TextArea placeholder="A large TextArea" height="large" />
				</TextAreaStoryComponent>
			</Spacer>
			<TextAreaStoryComponent>
				<TextArea placeholder="A TextArea with 10 rows" rows={10} />
			</TextAreaStoryComponent>
		</Fragment>
	))
	.add('TextArea widths', () => (
		<Fragment>
			<Spacer margin="bottom">
				<TextAreaStoryComponent>
					<TextArea placeholder="An xsmall TextArea" width="xsmall" />
				</TextAreaStoryComponent>
			</Spacer>
			<Spacer margin="bottom">
				<TextAreaStoryComponent>
					<TextArea placeholder="An small TextArea" width="small" />
				</TextAreaStoryComponent>
			</Spacer>
			<Spacer margin="bottom">
				<TextAreaStoryComponent>
					<TextArea placeholder="An medium TextArea" width="medium" />
				</TextAreaStoryComponent>
			</Spacer>
			<TextAreaStoryComponent>
				<TextArea placeholder="An large TextArea" width="large" />
			</TextAreaStoryComponent>
		</Fragment>
	));
