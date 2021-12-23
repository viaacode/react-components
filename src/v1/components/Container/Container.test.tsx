import { shallow } from 'enzyme';
import React, { Fragment } from 'react';

import { Container } from './Container';

describe('<Container />', () => {
	it('Should be able to render', () => {
		shallow(
			<Container>
				<Fragment />
			</Container>
		);
	});

	it('Should set the correct classnames when in horizontal mode', () => {
		const containerComponent = shallow(
			<Container mode="horizontal">
				<Fragment />
			</Container>
		);

		expect(containerComponent.hasClass('o-container')).toEqual(true);
	});

	it('Should set the correct custom classnames', () => {
		const customClass = 'o-container-vertical-title';
		const containerComponent = shallow(
			<Container className={customClass}>
				<Fragment />
			</Container>
		);

		expect(containerComponent.hasClass(customClass)).toEqual(true);
	});

	it('Should set the correct classnames when passing `size` and no mode is passed', () => {
		const smallContainerComponent = shallow(
			<Container size="small">
				<Fragment />
			</Container>
		);

		const mediumContainerComponent = shallow(
			<Container size="medium">
				<Fragment />
			</Container>
		);

		const largeContainerComponent = shallow(
			<Container size="large">
				<Fragment />
			</Container>
		);

		expect(smallContainerComponent.hasClass('o-container--small')).toEqual(true);
		expect(mediumContainerComponent.hasClass('o-container--medium')).toEqual(true);
		expect(largeContainerComponent.hasClass('o-container--large')).toEqual(true);
	});

	it('Should set the correct classnames when passing `size` in horizontal mode', () => {
		const smallContainerComponent = shallow(
			<Container mode="horizontal" size="small">
				<Fragment />
			</Container>
		);

		const mediumContainerComponent = shallow(
			<Container mode="horizontal" size="medium">
				<Fragment />
			</Container>
		);

		const largeContainerComponent = shallow(
			<Container mode="horizontal" size="large">
				<Fragment />
			</Container>
		);

		expect(smallContainerComponent.hasClass('o-container--small')).toEqual(true);
		expect(mediumContainerComponent.hasClass('o-container--medium')).toEqual(true);
		expect(largeContainerComponent.hasClass('o-container--large')).toEqual(true);
	});

	it('Should set the correct classnames when in vertical mode', () => {
		const containerComponent = shallow(
			<Container mode="vertical">
				<Fragment />
			</Container>
		);

		expect(containerComponent.hasClass('o-container-vertical')).toEqual(true);
	});

	it('Should set the correct classnames when passing `size` in vertical mode', () => {
		const smallContainerComponent = shallow(
			<Container mode="vertical" size="small">
				<Fragment />
			</Container>
		);

		const mediumContainerComponent = shallow(
			<Container mode="vertical" size="medium">
				<Fragment />
			</Container>
		);

		const largeContainerComponent = shallow(
			<Container mode="vertical" size="large">
				<Fragment />
			</Container>
		);

		expect(smallContainerComponent.hasClass('o-container-vertical--small')).toEqual(true);
		expect(mediumContainerComponent.hasClass('o-container-vertical--medium')).toEqual(true);
		expect(largeContainerComponent.hasClass('o-container-vertical--large')).toEqual(true);
	});

	it('Should be able to have an `alt` background', () => {
		const containerComponent = shallow(
			<Container background="alt">
				<Fragment />
			</Container>
		);

		expect(containerComponent.hasClass('o-container-vertical--bg-alt')).toEqual(true);
	});

	it('Should be able to have an `inverse` background', () => {
		const containerComponent = shallow(
			<Container background="inverse">
				<Fragment />
			</Container>
		);

		expect(containerComponent.hasClass('o-container-vertical--bg-inverse')).toEqual(true);
	});

	it('Should be able to be rendered with a bottom border', () => {
		const containerComponent = shallow(
			<Container bordered>
				<Fragment />
			</Container>
		);

		expect(containerComponent.hasClass('o-container-vertical--bottom-bordered')).toEqual(true);
	});

	it('Should correctly pass children', () => {
		const containerComponent = shallow(
			<Container>
				<p className="container-test" />
			</Container>
		);

		const paragraph = containerComponent.find('.container-test');

		expect(containerComponent.children().html()).toEqual(paragraph.html());
	});
});
