import clsx from 'clsx';
import { type FC, type ReactNode, useMemo } from 'react';

import { bemCls, getVariantClasses } from '../../utils/index.js';

import type { Breadcrumb, BreadcrumbsProps } from './Breadcrumbs.types.js';

const Breadcrumbs: FC<BreadcrumbsProps> = ({
	items,
	icon,
	linkComponent,
	className,
	rootClassName: root = 'c-breadcrumbs',
	variants,
	foregroundColor,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	const count = useMemo((): number => items.length, [items]);

	const renderBreadcrumb = ({ label, to }: Breadcrumb, i: number): ReactNode => {
		const isLast = i === count - 1;
		const foregroundStyle = foregroundColor ? { color: foregroundColor } : {};

		const Link = linkComponent;
		return (
			<li
				className={bem('item')}
				key={`breadcrumb-link-${i}`}
				aria-current={isLast ? 'page' : undefined}
			>
				{isLast ? (
					<p style={foregroundStyle} className={clsx(bem('link'), bem('link--active'))}>
						{label}
					</p>
				) : (
					<>
						<Link style={foregroundStyle} className={bem('link')} key={label} href={to}>
							{label}
						</Link>
						<div style={foregroundStyle} className={bem('icon')}>
							{icon}
						</div>
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
