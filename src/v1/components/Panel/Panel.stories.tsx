import { storiesOf } from '@storybook/react';
import React from 'react';

import { Panel } from './Panel';
import { PanelBody, PanelHeader } from './Panel.slots';

storiesOf('v1/components/Panel', module)
	.addParameters({ jest: ['Panel'] })
	.add('Panel', () => (
		<Panel>
			<PanelHeader>
				<p>Header</p>
			</PanelHeader>
			<PanelBody>
				<p>Body</p>
			</PanelBody>
		</Panel>
	))
	.add('Panel header', () => (
		<Panel>
			<PanelHeader>
				<p>Header</p>
			</PanelHeader>
		</Panel>
	))
	.add('Panel body', () => (
		<Panel>
			<PanelBody>
				<p>Body</p>
			</PanelBody>
		</Panel>
	));
