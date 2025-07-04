import { type RenderResult, render, screen } from '@testing-library/react'; //eslint-disable-line
import React from 'react';

import { Card } from './Card';
import { cardImageMock, cardTitleMock } from './__mocks__/card';

const subtitle = '(1 Dec. 2021)';
const toolbar = 'Toolbar content';
const children = 'Dynamic content';

describe('Component: <Card />', () => {
	let rendered: RenderResult;

	beforeEach(() => {
		rendered = render(
			<Card image={cardImageMock} title={cardTitleMock} subtitle={subtitle} toolbar={toolbar}>
				{children}
			</Card>
		);
	});

	it('Should show a title', () => {
		expect(screen.getByText(cardTitleMock)).toBeDefined();
	});

	it('Should show a subtitle', () => {
		expect(screen.getByText(subtitle)).toBeDefined();
	});

	it('Should render toolbar content', () => {
		expect(screen.getByText(toolbar)).toBeDefined();
	});

	it('Should render dynamic content', () => {
		expect(screen.getByText(children)).toBeDefined();
	});

	it('Should render an image', () => {
		const element = rendered.container.getElementsByClassName('c-card__image-wrapper');

		expect(element.length).toEqual(1);
	});

	it('Should apply the zinc edge by default', () => {
		const element = rendered.container.getElementsByClassName('c-card--edge-zinc');

		expect(element.length).toEqual(1);
	});

	it('Should apply the vertical orientation by default', () => {
		const element = rendered.container.getElementsByClassName('c-card--orientation-vertical');

		expect(element.length).toEqual(1);
	});

	it('Should not apply padding by default', () => {
		const element = rendered.container.getElementsByClassName('c-card--padded-none');

		expect(element.length).toEqual(1);
	});
});
