import React, { FunctionComponent, IframeHTMLAttributes } from 'react';

import classNames from 'classnames';

export interface BlockIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
	title: string;
	ratio?: '3:2' | '16:9';
}

export const BlockIframe: FunctionComponent<BlockIframeProps> = ({
	title,
	ratio,
	allowFullScreen = true,
	frameBorder = 0,
	...iframeProps
}) => {
	return (
		<div
			className={classNames('c-video-wrapper', {
				'c-video-wrapper--aspect-2-3': ratio === '3:2',
				'c-video-wrapper--aspect-16-9': ratio === '16:9',
			})}
		>
			<iframe
				title={title}
				allowFullScreen={allowFullScreen}
				frameBorder={frameBorder}
				{...iframeProps}
			/>
		</div>
	);
};