import { storiesOf } from '@storybook/react';
import React from 'react';

import { action } from '../../helpers';
import { IconNameSchema } from '../Icon/Icon.types';

import { Tabs } from './Tabs';

const mockTabs = [
	{
		label: 'Videos',
		id: 'video',
		active: true,
	},
	{
		label: 'Audio',
		id: 'audio',
	},
	{
		label: 'Collections',
		id: 'collection',
	},
	{
		label: 'Bundles',
		id: 'bundle',
	},
];

const mockTabsWithIcons = [
	{
		...mockTabs[0],
		icon: 'video' as IconNameSchema,
	},
	{
		...mockTabs[1],
		icon: 'headphone' as IconNameSchema,
	},
	{
		...mockTabs[2],
		icon: 'collection' as IconNameSchema,
	},
	{
		...mockTabs[3],
		icon: 'folder' as IconNameSchema,
	},
];

storiesOf('v1/components/Tabs', module)
	.addParameters({ jest: ['Tabs'] })
	.add('Tabs', () => (
		<>
			<div style={{ backgroundColor: '#FFF', padding: '5px' }}>
				<Tabs tabs={mockTabs} onClick={action('tab clicked')} />
			</div>
			<br />
			<div style={{ backgroundColor: '#EDEFF2', padding: '5px' }}>
				<Tabs tabs={mockTabs} onClick={action('tab clicked')} />
			</div>
			<br />
			<div style={{ backgroundColor: '#8AC1CE', padding: '5px' }}>
				<Tabs tabs={mockTabs} dark onClick={action('tab clicked')} />
			</div>
			<br />
			<div style={{ backgroundColor: '#3A586F', padding: '5px' }}>
				<Tabs tabs={mockTabs} dark onClick={action('tab clicked')} />
			</div>
			<br />
			<div style={{ backgroundColor: '#1D637A', padding: '5px' }}>
				<Tabs tabs={mockTabs} dark onClick={action('tab clicked')} />
			</div>
			<br />
			<div style={{ backgroundColor: '#25a4cf', padding: '5px' }}>
				<Tabs tabs={mockTabs} dark onClick={action('tab clicked')} />
			</div>
			<br />
			<div style={{ backgroundColor: '#00C8AA', padding: '5px' }}>
				<Tabs tabs={mockTabs} dark onClick={action('tab clicked')} />
			</div>
			<br />
			<div style={{ backgroundColor: '#f3aa2e', padding: '5px' }}>
				<Tabs tabs={mockTabs} dark onClick={action('tab clicked')} />
			</div>
		</>
	))
	.add('Tabs (border)', () => <Tabs tabs={mockTabs} border onClick={action('tab clicked')} />)
	.add('Tabs with Icons', () => (
		<Tabs tabs={mockTabsWithIcons} onClick={action('tab clicked')} />
	));
