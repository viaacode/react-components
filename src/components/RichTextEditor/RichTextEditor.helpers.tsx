import beautify from 'js-beautify';

export function prettifyHtml(html: string | undefined): string {
	return beautify.html(html || '', {
		indent_size: 2,
	});
}
