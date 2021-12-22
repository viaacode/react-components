import { shallow } from 'enzyme';
import React from 'react';

import { Thumbnail } from './Thumbnail';

describe('<Thumbnail />', () => {
	it('Should be able to render', () => {
		shallow(
			<Thumbnail
				src="/images/thumbnail.jpg"
				meta="4 items"
				category="collection"
				label="collection"
			/>
		);
	});

	it('Should set the correct className', () => {
		const customClass = 'c-thumbnail-custom';

		const thumbnailComponent = shallow(
			<Thumbnail
				className={customClass}
				src="/images/thumbnail.jpg"
				meta="4 items"
				category="collection"
				label="collection"
			/>
		);

		expect(thumbnailComponent.hasClass(customClass)).toEqual(true);
		expect(thumbnailComponent.hasClass('c-thumbnail')).toEqual(true);
		expect(thumbnailComponent.hasClass('c-thumbnail-media')).toEqual(true);
	});

	it('Should set the correct className for each category', () => {
		const thumbnailComponent = shallow(
			<Thumbnail
				src="/images/thumbnail.jpg"
				meta="4 items"
				category="collection"
				label="collection"
			/>
		);

		expect(thumbnailComponent.hasClass('c-thumbnail-media--collection')).toEqual(true);
	});

	it('Should render image if src is correctly passed', () => {
		const img = '/images/thumbnail.jpg';
		const thumbnailComponent = shallow(
			<Thumbnail src={img} meta="4 items" category="collection" label="collection" />
		);

		const imageContainer = thumbnailComponent.find('.c-thumbnail-image');
		expect(imageContainer).toHaveLength(1);
		expect(imageContainer.prop('style')).toHaveProperty('backgroundImage', `url("${img}")`);
	});

	it('Should render placeholder if no src is passed', () => {
		const thumbnailComponent = shallow(
			<Thumbnail meta="4 items" category="collection" label="collection" />
		);

		const imageContainer = thumbnailComponent.find('.c-thumbnail-image');
		expect(imageContainer).toHaveLength(0);

		const placeholderElement = thumbnailComponent.find('.c-thumbnail-placeholder');
		expect(placeholderElement).toHaveLength(1);
	});

	it('Should correctly set alt if it was passed', () => {
		const alt = 'thumbnail';

		const thumbnailComponent = shallow(
			<Thumbnail
				src="/images/thumbnail.jpg"
				alt={alt}
				meta="4 items"
				category="collection"
				label="collection"
			/>
		);

		const imageContainer = thumbnailComponent.find('.c-thumbnail-image');
		expect(imageContainer.prop('title')).toEqual(alt);
	});

	it('Should render meta if it was passed', () => {
		const thumbnailComponent = shallow(
			<Thumbnail
				src="/images/thumbnail.jpg"
				meta="4 items"
				category="collection"
				label="collection"
			/>
		);

		const metaElement = thumbnailComponent.find('.c-thumbnail-media__meta');
		expect(metaElement).toHaveLength(1);
	});

	it('Should not render meta if it was not passed', () => {
		const thumbnailComponent = shallow(
			<Thumbnail src="/images/thumbnail.jpg" category="collection" label="collection" />
		);

		const metaElement = thumbnailComponent.find('.c-thumbnail-media__meta');
		expect(metaElement).toHaveLength(0);
	});
});
