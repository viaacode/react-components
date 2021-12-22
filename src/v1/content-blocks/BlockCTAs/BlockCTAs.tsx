import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { CTA, CTAProps } from '../../components';
import { defaultRenderLinkFunction } from '../../helpers/render-link';
import { DefaultProps, RenderLinkFunction } from '../../types';

export interface BlockCTAsProps extends DefaultProps {
	elements: CTAProps[];
	width?: string;
	renderLink?: RenderLinkFunction;
}

export const BlockCTAs: FunctionComponent<BlockCTAsProps> = ({
	className,
	elements,
	width,
	renderLink = defaultRenderLinkFunction,
}) => (
	<div className={classnames(className, 'c-cta')}>
		{elements.map((cta, index) => (
			<CTA
				key={`cta-${index}`}
				{...cta}
				renderLink={renderLink}
				width={width || (elements.length === 1 ? '100%' : '50%')}
			/>
		))}
	</div>
);
