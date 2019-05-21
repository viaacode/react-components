import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Button } from './Button';

storiesOf('Button', module)
	.add('With text', () => <Button onClick={action('onClick')}>Click me!</Button>)
	.add('With emojis', () => <Button onClick={action('onClick')}>🐝 🎈 😬</Button>);
