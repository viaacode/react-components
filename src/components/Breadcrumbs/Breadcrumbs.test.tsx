import { render } from '@testing-library/react';
import React from 'react';

import Breadcrumbs from './Breadcrumbs';
import { MOCK_BREADCRUMBS } from './Breadcrumbs.mock';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

const renderBreadcrumbs = ({ ...props }: BreadcrumbsProps) => {
	return render(<Breadcrumbs {...props} />);
};

describe('<Breadcrumbs />', () => {
	it('Should set the correct className', () => {
		const className = 'c-breadcrumbs-custom';

		const { container } = renderBreadcrumbs({
			className,
			items: MOCK_BREADCRUMBS,
			icon: <span>icon</span>,
			linkComponent: (props) => (
				<a href={props.href} className={props.className}>
					{props.children}
				</a>
			),
		});

		const breadcrumbsComponent = container.querySelector('.c-breadcrumbs');

		expect(breadcrumbsComponent).toHaveClass('c-breadcrumbs');
		expect(breadcrumbsComponent).toHaveClass(className);
	});

	it('Should render a navigation tag', () => {
		const { container } = renderBreadcrumbs({
			items: MOCK_BREADCRUMBS,
			icon: <span>icon</span>,
			linkComponent: (props) => (
				<a href={props.href} className={props.className}>
					{props.children}
				</a>
			),
		});

		const breadcrumbsComponent = container.getElementsByTagName('nav');

		expect(breadcrumbsComponent).toBeDefined();
	});

	it('Should render all links', () => {
		const { container } = renderBreadcrumbs({
			items: MOCK_BREADCRUMBS,
			icon: <span>icon</span>,
			linkComponent: (props) => (
				<a href={props.href} className={props.className}>
					{props.children}
				</a>
			),
		});

		const breadcrumbsComponent = container.querySelectorAll('.c-breadcrumbs__item');

		expect(breadcrumbsComponent).toHaveLength(MOCK_BREADCRUMBS.length);
	});

	it('Should render an icon after each link except for the last link', () => {
		const { container } = renderBreadcrumbs({
			items: MOCK_BREADCRUMBS,
			icon: <span>icon</span>,
			linkComponent: (props) => (
				<a href={props.href} className={props.className}>
					{props.children}
				</a>
			),
		});

		const icons = container.querySelectorAll('.c-breadcrumbs__icon');
		expect(icons).toHaveLength(MOCK_BREADCRUMBS.length - 1);
	});
});
