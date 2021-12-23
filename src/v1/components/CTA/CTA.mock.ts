import { action } from '../../helpers';
import { testRenderLink } from '../../helpers/render-link';
import { LinkTarget } from '../../types';

import { CTAPropsSchema } from './CTA';

export const CTA_MOCK: CTAPropsSchema = {
	heading: 'Titel',
	headingType: 'h3',
	content: 'Text',
	buttonLabel: 'Read more',
	buttonIcon: 'chevron-down',
	buttonAction: {
		target: LinkTarget.Blank,
		type: 'EXTERNAL_LINK',
		value: 'http://google.com',
	},
	renderLink: testRenderLink(action('navigate to')),
};
