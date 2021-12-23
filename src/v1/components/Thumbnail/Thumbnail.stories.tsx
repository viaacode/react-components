import { storiesOf } from '@storybook/react';
import React from 'react';

import { Thumbnail } from './Thumbnail';

storiesOf('v1/components/Thumbnail', module)
	.addParameters({ jest: ['Thumbnail'] })
	.add('Thumbnail (image)', () => (
		<div className="o-grid-col-bp3-4">
			<Thumbnail src="/images/thumbnail.jpg" meta="4 items" category="video" label="video" />
		</div>
	))
	.add('Thumbnail (placeholder)', () => (
		<div className="o-grid-col-bp3-4">
			<Thumbnail meta="4 items" category="collection" label="collection" />
		</div>
	))
	.add('Thumbnail with label', () => (
		<div className="o-grid-col-bp3-4">
			<Thumbnail
				src="/images/thumbnail.jpg"
				category="collection"
				meta="4 items"
				label="collection"
			/>
		</div>
	))
	.add('Thumbnail without label', () => (
		<div className="o-grid-col-bp3-4">
			<Thumbnail src="/images/thumbnail.jpg" category="bundle" meta="2:22" />
		</div>
	))
	.add('Thumbnail without meta', () => (
		<div className="o-grid-col-bp3-4">
			<Thumbnail src="/images/thumbnail.jpg" category="audio" label="audio" />
		</div>
	))
	.add('Thumbnail with showCategoryIcon', () => (
		<div className="o-grid-col-bp3-4">
			<Thumbnail src="/images/thumbnail.jpg" category="audio" showCategoryIcon />
		</div>
	));
