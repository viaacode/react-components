import beautify from 'js-beautify';

import { ALL_RICH_TEXT_HEADINGS, Heading } from './RichTextEditor.types';

export function getHiddenHeadingClasses(enabledHeadings: Heading[]): string {
	if (enabledHeadings.length === 0) {
		// if no enabled headings are passed, show all headings
		return '';
	}
	const hiddenHeadings = ALL_RICH_TEXT_HEADINGS.filter((val) => !enabledHeadings.includes(val));
	return hiddenHeadings.map((heading) => `c-rich-text-editor--hide-${heading}`).join(' ');
}

export function prettifyHtml(html: string | undefined): string {
	return beautify.html(html || '', {
		indent_size: 2,
	});
}
