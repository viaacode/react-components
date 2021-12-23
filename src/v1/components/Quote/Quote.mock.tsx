import { loremIpsum } from 'lorem-ipsum';

export const MOCK_QUOTE = {
	quote: loremIpsum({ count: 1 }),
	authorName: 'Albert Einstein',
	authorInitials: 'AE',
};

export const MOCK_QUOTE_WITH_IMG = {
	...MOCK_QUOTE,
	authorImage: '/images/50x50.svg',
};
