import { shallow } from 'enzyme';
import React, { Fragment } from 'react';

import { COLORS } from '../../colors';
import { Navbar } from './Navbar';

describe('<Navbar />', () => {
	it('Should be able to render', () => {
		shallow(
			<Navbar>
				<Fragment />
			</Navbar>
		);
	});

	it('Should set the correct classNames when position is passed', () => {
		const navbarDefaultComponent = shallow(
			<Navbar>
				<Fragment />
			</Navbar>
		);
		const navbarTopComponent = shallow(
			<Navbar position="top">
				<Fragment />
			</Navbar>
		);
		const navbarBottomComponent = shallow(
			<Navbar position="bottom">
				<Fragment />
			</Navbar>
		);

		expect(navbarDefaultComponent.hasClass('c-navbar--bordered-bottom')).toEqual(true);
		expect(navbarDefaultComponent.hasClass('c-navbar--bordered-top')).toEqual(false);

		expect(navbarTopComponent.hasClass('c-navbar--bordered-bottom')).toEqual(true);
		expect(navbarTopComponent.hasClass('c-navbar--bordered-top')).toEqual(false);

		expect(navbarBottomComponent.hasClass('c-navbar--bordered-top')).toEqual(true);
		expect(navbarBottomComponent.hasClass('c-navbar--bordered-bottom')).toEqual(false);
	});

	it('Should set the correct classNames when spacing is passed', () => {
		const navbarDefaultComponent = shallow(
			<Navbar>
				<Fragment />
			</Navbar>
		);
		const navbarRegularComponent = shallow(
			<Navbar spacing="regular">
				<Fragment />
			</Navbar>
		);
		const navbarDoubleComponent = shallow(
			<Navbar spacing="double">
				<Fragment />
			</Navbar>
		);

		expect(navbarDefaultComponent.hasClass('c-navbar--double-spaced')).toEqual(false);
		expect(navbarRegularComponent.hasClass('c-navbar--double-spaced')).toEqual(false);
		expect(navbarDoubleComponent.hasClass('c-navbar--double-spaced')).toEqual(true);
	});

	it('Should set the correct classNames when autoHeight is passed', () => {
		const navbarDefaultComponent = shallow(
			<Navbar>
				<Fragment />
			</Navbar>
		);
		const navbarAutoHeightTrueComponent = shallow(
			<Navbar autoHeight={true}>
				<Fragment />
			</Navbar>
		);
		const navbarAutoHeightFalseComponent = shallow(
			<Navbar autoHeight={false}>
				<Fragment />
			</Navbar>
		);

		expect(navbarDefaultComponent.hasClass('c-navbar--auto')).toEqual(false);
		expect(navbarAutoHeightTrueComponent.hasClass('c-navbar--auto')).toEqual(true);
		expect(navbarAutoHeightFalseComponent.hasClass('c-navbar--auto')).toEqual(false);
	});

	it('Should set the correct classNames when background is passed', () => {
		const navbarDefaultComponent = shallow(
			<Navbar>
				<Fragment />
			</Navbar>
		);
		const navbarWhiteComponent = shallow(
			<Navbar background="white">
				<Fragment />
			</Navbar>
		);
		const navbarAltComponent = shallow(
			<Navbar background="alt">
				<Fragment />
			</Navbar>
		);
		const navbarInverseComponent = shallow(
			<Navbar background="inverse">
				<Fragment />
			</Navbar>
		);

		expect(navbarDefaultComponent.hasClass('.c-navbar--white')).toEqual(false);
		expect(navbarDefaultComponent.hasClass('.c-navbar--alt')).toEqual(false);
		expect(navbarDefaultComponent.hasClass('.c-navbar--inverse')).toEqual(false);

		expect(navbarWhiteComponent.hasClass('.c-navbar--white')).toEqual(true);
		expect(navbarWhiteComponent.hasClass('.c-navbar--alt')).toEqual(false);
		expect(navbarWhiteComponent.hasClass('.c-navbar--inverse')).toEqual(false);

		expect(navbarAltComponent.hasClass('.c-navbar--white')).toEqual(false);
		expect(navbarAltComponent.hasClass('.c-navbar--alt')).toEqual(true);
		expect(navbarAltComponent.hasClass('.c-navbar--inverse')).toEqual(false);

		expect(navbarInverseComponent.hasClass('.c-navbar--white')).toEqual(false);
		expect(navbarInverseComponent.hasClass('.c-navbar--alt')).toEqual(false);
		expect(navbarInverseComponent.hasClass('.c-navbar--inverse')).toEqual(true);
	});

	it('Should correctly pass children', () => {
		const navbarComponent = shallow(
			<Navbar>
				<p className="navbar-test" />
			</Navbar>
		);

		const paragraph = navbarComponent.find('.navbar-test');

		expect(navbarComponent.children().html()).toEqual(paragraph.html());
	});
});
