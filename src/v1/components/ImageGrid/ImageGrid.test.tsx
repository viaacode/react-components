import { shallow } from 'enzyme';
import React from 'react';

import { ImageGrid } from './ImageGrid';

const images = [
	'/images/200x200.svg?id=0',
	'/images/200x200.svg?id=1',
	'/images/200x200.svg?id=2',
	'/images/200x200.svg?id=3',
	'/images/200x200.svg?id=4',
	'/images/200x200.svg?id=5',
	'/images/200x200.svg?id=6',
	'/images/200x200.svg?id=7',
	'/images/200x200.svg?id=8',
	'/images/200x200.svg?id=9',
];

describe('<ImageGrid />', () => {
	it('Should be able to render', () => {
		shallow(<ImageGrid images={images} />);
	});

	it('Should set the correct default className and custom className', () => {
		const customClass = 'test-grid';

		const ImageGridComponent = shallow(<ImageGrid className={customClass} images={images} />);

		expect(ImageGridComponent.hasClass(customClass)).toEqual(true);
		expect(ImageGridComponent.hasClass('c-image-grid')).toEqual(true);
		expect(ImageGridComponent.hasClass('c-image-grid-selectable')).toEqual(false);
	});

	it('Should set the correct className when selectable', () => {
		const ImageGridComponent = shallow(<ImageGrid images={images} allowSelect={true} />);

		expect(ImageGridComponent.hasClass('c-image-grid')).toEqual(true);
		expect(ImageGridComponent.hasClass('c-image-grid-selectable')).toEqual(true);
	});

	it('Should set the correct styles for width and height', () => {
		const width = 123;
		const height = 321;
		const ImageGridComponent = shallow(
			<ImageGrid images={images} width={width} height={height} />
		);

		const item = ImageGridComponent.find('.c-image-grid__item').at(0);

		expect(item.prop('style')).toHaveProperty('width', `${width}px`);
		expect(item.prop('style')).toHaveProperty('height', `${height}px`);
	});

	it('Should pass selected item (single)', () => {
		const onChangeHandler = jest.fn();

		const ImageGridComponent = shallow(
			<ImageGrid images={images} allowSelect={true} onChange={onChangeHandler} />
		);

		const item = ImageGridComponent.find('.c-image-grid__item').at(5);

		item.simulate('click');

		expect(onChangeHandler).toBeCalledTimes(1);
		expect(onChangeHandler).toBeCalledWith([images[5]]);

		const item2 = ImageGridComponent.find('.c-image-grid__item').at(3);

		item2.simulate('click');

		// expect(item2.hasClass('c-image-grid__item-selected')).toEqual(true);
		expect(onChangeHandler).toBeCalledTimes(2);
		expect(onChangeHandler).toBeCalledWith([images[3]]);
	});

	it('Should pass first selected items (multi)', () => {
		const onChangeHandler = jest.fn();

		const ImageGridComponent = shallow(
			<ImageGrid
				images={images}
				allowSelect={true}
				allowMulti={true}
				onChange={onChangeHandler}
			/>
		);

		const item5 = ImageGridComponent.find('.c-image-grid__item').at(5);

		item5.simulate('click');

		expect(onChangeHandler).toBeCalledTimes(1);
		expect(onChangeHandler).toBeCalledWith([images[5]]);
	});

	it('Should pass second selected items (multi)', () => {
		const onChangeHandler = jest.fn();

		const ImageGridComponent = shallow(
			<ImageGrid
				images={images}
				allowSelect={true}
				allowMulti={true}
				onChange={onChangeHandler}
				value={[images[5]]}
			/>
		);

		const item3 = ImageGridComponent.find('.c-image-grid__item').at(3);

		item3.simulate('click');

		expect(onChangeHandler).toBeCalledTimes(1);
		expect(onChangeHandler).toBeCalledWith([images[5], images[3]]);
	});

	it('Should correctly unselect items (multi)', () => {
		const onChangeHandler = jest.fn();

		const ImageGridComponent = shallow(
			<ImageGrid
				images={images}
				allowSelect={true}
				allowMulti={true}
				onChange={onChangeHandler}
				value={[images[5], images[3]]}
			/>
		);

		const item5 = ImageGridComponent.find('.c-image-grid__item').at(5);

		item5.simulate('click');

		expect(onChangeHandler).toBeCalledTimes(1);
		expect(onChangeHandler).toBeCalledWith([images[3]]);
	});
});
