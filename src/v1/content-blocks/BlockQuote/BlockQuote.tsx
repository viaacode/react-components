import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { Quote } from '../../components/Quote/Quote';
import { DefaultProps } from '../../types';

export interface BlockQuoteProps extends DefaultProps {
	quote: string;
	authorImage?: string;
	authorName: string;
	authorInitials?: string;
}

export const BlockQuote: FunctionComponent<BlockQuoteProps> = ({
	className,
	quote,
	authorImage,
	authorName,
	authorInitials,
}) => (
	<Quote
		className={classnames('c-block-quote', className)}
		quote={quote}
		authorImage={authorImage}
		authorName={authorName}
		authorInitials={authorInitials}
	/>
);
