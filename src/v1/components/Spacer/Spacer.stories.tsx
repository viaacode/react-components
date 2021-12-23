import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React, { Fragment } from 'react';

import { Spacer } from './Spacer';

const content = loremIpsum({ count: 3 });

storiesOf('v1/components/Spacer', module)
	.addParameters({ jest: ['Spacer'] })
	.add('Spacer margins', () => (
		<Fragment>
			<p>
				<b>none </b>
				{content}
			</p>
			<Spacer margin="none">
				<b>none </b>
				{content}
			</Spacer>
			<Spacer margin="small">
				<b>small</b>
				{content}
			</Spacer>
			<Spacer>
				<b>medium</b>
				{content}
			</Spacer>
			<Spacer margin="large">
				<b>large</b>
				{content}
			</Spacer>
			<Spacer margin="extra-large">
				<b>extra-large</b>
				{content}
			</Spacer>
			<p>{content}</p>
		</Fragment>
	))
	.add('Spacer with multiple margins', () => (
		<Fragment>
			<p>{content}</p>
			<Spacer margin={['left-large', 'top-large', 'bottom-large']}>
				<p>{content}</p>
			</Spacer>
			<p>{content}</p>
		</Fragment>
	))
	.add('Spacer paddings', () => (
		<Fragment>
			<p>
				<b>none </b>
				{content}
			</p>
			<Spacer padding="small">
				<b>small </b>
				{content}
			</Spacer>
			<Spacer padding="medium">
				<b>medium </b>
				{content}
			</Spacer>
			<Spacer padding="large">
				<b>large </b>
				{content}
			</Spacer>
			<Spacer padding="extra-large">
				<b>extra-large </b>
				{content}
			</Spacer>
			<p>{content}</p>
		</Fragment>
	))
	.add('Spacer with multiple paddings', () => (
		<Fragment>
			<p>{content}</p>
			<Spacer padding={['left-large', 'top-large', 'bottom-large']}>
				<p>{content}</p>
			</Spacer>
			<p>{content}</p>
		</Fragment>
	))
	.add('Spacer mixed', () => (
		<Fragment>
			<p>{content}</p>
			<Spacer margin={['left-large', 'right-large']} padding={['top-large', 'bottom-large']}>
				<p>{content}</p>
			</Spacer>
			<p>{content}</p>
		</Fragment>
	));
