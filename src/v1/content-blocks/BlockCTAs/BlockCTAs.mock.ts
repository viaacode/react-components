import { loremIpsum } from 'lorem-ipsum';

import { CTAProps } from '../../components';
import { action } from '../../helpers';
import { testRenderLink } from '../../helpers/render-link';
import { LinkTarget } from '../../types';

const content = loremIpsum({ count: 10 });

export const CTAS_MOCK: CTAProps[] = [
	{
		content,
		heading: 'CTA 1',
		headingType: 'h2',
		buttonLabel: 'Button 1',
		buttonAction: {
			type: 'EXTERNAL_LINK',
			value: 'https://google.com',
			target: LinkTarget.Blank,
		},
		renderLink: testRenderLink(action('CTA 1')),
	},
	{
		content,
		contentColor: '#0000FF',
		heading: 'CTA 2',
		headingColor: 'red',
		headingType: 'h2',
		buttonLabel: 'Button 2',
		buttonType: 'danger',
		backgroundColor: 'green',
		buttonAction: {
			type: 'EXTERNAL_LINK',
			value: 'https://google.com',
			target: LinkTarget.Blank,
		},
		renderLink: testRenderLink(action('CTA 2')),
	},
];
