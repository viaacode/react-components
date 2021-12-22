import { storiesOf } from '@storybook/react';
import React from 'react';

import { MetaData } from '../MetaData';

import { MetaDataItem } from './MetaDataItem';

storiesOf('v1/components/MetaDataItem', module)
	.addParameters({ jest: ['MetaDataItem'] })
	.add('Meta data item', () => (
		<MetaData category="video">
			<MetaDataItem label="VRT" />
		</MetaData>
	))
	.add('Meta data item with icon', () => (
		<MetaData category="audio">
			<MetaDataItem icon="headphone" label="768" />
		</MetaData>
	));
