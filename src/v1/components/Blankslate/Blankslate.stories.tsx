import { storiesOf } from '@storybook/react';
import React from 'react';

import { Spacer } from '../Spacer/Spacer';

import { Blankslate } from './Blankslate';

storiesOf('v1/components/Blankslate', module)
	.addParameters({ jest: ['Blankslate'] })
	.add('Blankslate', () => (
		<Blankslate
			title="This is a blank slate"
			body="Use it to provide information when no dynamic content exists."
		/>
	))
	.add('Spacious blankslate', () => (
		<Blankslate
			title="This is a spacious blank slate"
			body="Use it to provide information when no dynamic content exists."
			spacious
		/>
	))
	.add('Blankslate with icon', () => (
		<Blankslate
			title="This is a blank slate"
			body="Use it to provide information when no dynamic content exists."
			icon="search"
		/>
	))
	.add('Blankslate content', () => (
		<Blankslate
			title="This is a blank slate"
			body="Use it to provide information when no dynamic content exists."
			icon="search"
		>
			<Spacer margin="top-large">
				Extra content for the blankslate can be passed via <code>children</code>.
			</Spacer>
		</Blankslate>
	))
	.add('Blankslate html content', () => (
		<Blankslate
			title="Oeps. Pagina niet gevonden"
			body="Sorry, we hebben overal gekeken, maar de pagina die je zoekt bestaat niet (meer) of je hebt geen rechten om deze te bekijken.<br /> Vermoed je een fout? Neem dan contact met ons op via de Feedback-knop."
			icon="search"
		/>
	));
