import { shallow } from 'enzyme';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { BlockQuote } from './BlockQuote';

const customClass = 'c-block-custom';
const quote = loremIpsum({ count: 10 });
const authorImage = '/images/50x50.svg';
const authorName = loremIpsum({ count: 2 });
const authorInitials = 'AE';

export const quoteExample = (
	<BlockQuote
		className={customClass}
		quote={quote}
		authorImage={authorImage}
		authorName={authorName}
		authorInitials={authorInitials}
	/>
);

describe('<BlockQuote />', () => {
	it('Should be able to render', () => {
		shallow(quoteExample);
	});
});
