import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Alert from './Alert';

export default {
	title: 'Components/Alert',
	component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: 'Title',
	content: (
		<>
			<p>
				Etiam a congue diam. Aenean et diam id leo sollicitudin accumsan vel sit amet arcu. Maecenas
				molestie lacus laoreet.
			</p>
			<p>
				Duis molestie cursus eleifend. Suspendisse auctor libero nec elit ultrices suscipit.
				Maecenas vehicula augue a lectus rutrum facilisis. Vivamus at risus consequat, fringilla
				mauris ac, rhoncus nibh. Nunc varius, mi sollicitudin porta aliquam, augue eros egestas
				nunc, quis accumsan ante purus id nisl. Donec egestas arcu quis arcu finibus commodo.
				Vestibulum auctor condimentum maximus. Donec nec egestas sem. Ut ut neque velit. Donec
				posuere tempor dolor vitae tincidunt. Quisque a diam quis erat pulvinar tempor. Mauris id
				tincidunt erat. Duis lobortis vulputate mattis. Praesent vitae semper nibh, ac consequat
				justo.
			</p>
		</>
	),
};

export const WithIcon = Template.bind({});
WithIcon.args = {
	title: 'Title',
	icon: <div>X</div>,
	content: (
		<>
			<p>
				Etiam a congue diam. Aenean et diam id leo sollicitudin accumsan vel sit amet arcu. Maecenas
				molestie lacus laoreet.
			</p>
			<p>
				Duis molestie cursus eleifend. Suspendisse auctor libero nec elit ultrices suscipit.
				Maecenas vehicula augue a lectus rutrum facilisis. Vivamus at risus consequat, fringilla
				mauris ac, rhoncus nibh. Nunc varius, mi sollicitudin porta aliquam, augue eros egestas
				nunc, quis accumsan ante purus id nisl. Donec egestas arcu quis arcu finibus commodo.
				Vestibulum auctor condimentum maximus. Donec nec egestas sem. Ut ut neque velit. Donec
				posuere tempor dolor vitae tincidunt. Quisque a diam quis erat pulvinar tempor. Mauris id
				tincidunt erat. Duis lobortis vulputate mattis. Praesent vitae semper nibh, ac consequat
				justo.
			</p>
		</>
	),
};
