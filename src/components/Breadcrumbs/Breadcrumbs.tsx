import clsx from 'clsx';
import React, { FC, ReactNode, useMemo } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { Breadcrumb, BreadcrumbsProps } from './Breadcrumbs.types';

const Breadcrumbs: FC<BreadcrumbsProps> = ({
	items,
	icon,
	linkComponent,
	className,
	rootClassName: root = 'c-breadcrumbs',
	variants,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	const count = useMemo((): number => items.length, [items]);

	const renderBreadcrumb = ({ label, to }: Breadcrumb, i: number): ReactNode => {
		const isLast = i === count - 1;

		const Link = linkComponent;
		return (
			<li
				className={bem('item')}
				key={`breadcrumb-link-${i}`}
				aria-current={isLast ? 'page' : undefined}
			>
				{isLast ? (
					<p className={clsx(bem('link'), bem('link--active'))}>{label}</p>
				) : (
					<>
						<Link className={bem('link')} key={label} href={to}>
							{label}
						</Link>
						<div className={bem('icon')}>{icon}</div>
					</>
				)}
			</li>
		);
	};

	return (
		<nav className={rootCls} aria-label="Breadcrumbs">
			<ol className={bem('list')}>
				{items.map((item: Breadcrumb, i: number): ReactNode => renderBreadcrumb(item, i))}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
