export function getLanguage(languages: any, context: string): any {
	if (context === 'braft-table') {
		return {
			rows: 'Rijen',
			columns: 'Kolommen',
			cancel: 'Annuleer',
			insertTable: 'Tabel invoegen',
			removeTable: 'Verwijder Tabel',
			insertColumn: 'Voeg kolom in',
			removeColumn: 'Verwijder kolom',
			insertRow: 'Voeg rij in',
			removeRow: 'Verwijder rij',
			mergeCells: 'Samenvoegen cellen',
			splitCell: 'Split cell',
		};
	}
	if (context === 'braft-finder') {
		return {
			remove: 'Verwijder',
			cancel: 'Annuleer',
			confirm: 'Bevestig',
			insert: 'Voeg selectie in',
			width: 'Breedte',
			height: 'Hoogte',
			image: 'Afbeelding',
			video: 'Video',
			audio: 'Audio',
			embed: 'Embed',
			caption: 'Media Bibliotheek',
			dragTip: 'Klik of sleep bestanden hier',
			dropTip: 'Drop om te uploaden',
			selectAll: 'Selecteer alle',
			deselect: 'Deselecteren',
			removeSelected: 'Verwijder selectie',
			externalInputPlaceHolder: 'Bron naam|Bron URL',
			externalInputTip: 'Splits bron naam en bron URL met "|", bevestig met enter.',
			addLocalFile: 'Voeg lokale bestanden toe',
			addExternalSource: 'Voeg bestanden toe van internet',
			unnamedItem: 'Naamloos item',
			confirmInsert: 'Voeg selectie in',
		};
	}
	if (context === 'braft-editor') {
		return {
			base: {
				remove: 'Verwijder',
				cancel: 'Annuleer',
				confirm: 'Bevestig',
				inert: 'Invoegen',
				width: 'Breedte',
				height: 'Hoogte',
			},
			controls: {
				clear: 'Wis',
				undo: 'Ongedaan maken',
				redo: 'Opnieuw doen',
				fontSize: 'Font grootte',
				color: 'Kleur',
				textColor: 'Tekst',
				tempColors: 'Tijdelijke Kleuren',
				backgroundColor: 'Achtergrond',
				bold: 'Vet',
				lineHeight: 'Regel hoogte',
				letterSpacing: 'Letterafstand',
				textIndent: 'Tekst inspringen',
				increaseIndent: 'Inspringing vergroten',
				decreaseIndent: 'Inspringing verkleinen',
				italic: 'Cursief',
				underline: 'Onderstreept',
				strikeThrough: 'Doorstreept',
				fontFamily: 'Font Familie',
				textAlign: 'Tekstuitlijning',
				alignLeft: 'Uitlijning links',
				alignCenter: 'Uitlijning midden',
				alignRight: 'Uitlijning rechts',
				alignJustify: 'Uitvullen',
				floatLeft: 'Links zwevend',
				floatRight: 'Rechts zwevend',
				superScript: 'Superscript',
				subScript: 'Subscript',
				removeStyles: 'Verwijder stijl',
				headings: 'Koppen',
				header: 'Koptekst',
				normal: 'Normaal',
				orderedList: 'Geordende lijst',
				unorderedList: 'Ongeordende lijst',
				blockQuote: 'Quote',
				code: 'Code',
				link: 'Link',
				unlink: 'Unlink',
				hr: 'Horizontale regel',
				media: 'Media',
				mediaLibirary: 'Media bibliotheek',
				emoji: 'Emoji',
				fullscreen: 'Fullscreen',
				exitFullscreen: 'Fullscreen sluiten',
				htmlEdit: 'HTML bewerken',
			},
			linkEditor: {
				textInputPlaceHolder: 'Link tekst invoeren',
				linkInputPlaceHolder: 'Link URL invoeren',
				inputWithEnterPlaceHolder: 'Voeg link URL in en druk op enter',
				openInNewWindow: 'Openen in een nieuw venster',
				removeLink: 'Verwijder link',
			},
			audioPlayer: {
				title: 'Audio afspelen',
			},
			videoPlayer: {
				title: 'Video afspelen',
				embedTitle: 'Embed media',
			},
			media: {
				image: 'Afbeelding',
				video: 'Video',
				audio: 'Audio',
				embed: 'Embed',
			},
		};
	}
	return languages.nl || languages.en;
}

import type { RichTextEditorControl } from './RichTextEditor.types';

function controlToFormat(control: RichTextEditorControl): unknown {
	switch (control) {
		case 'bold':
			return 'bold';
		case 'italic':
			return 'italic';
		case 'underline':
			return 'underline';
		case 'strike-through':
			return 'strike';
		case 'superscript':
			return { script: 'super' };
		case 'subscript':
			return { script: 'sub' };
		case 'remove-styles':
		case 'clear':
			return 'clean';
		case 'text-align':
			return { align: [] };
		case 'headings':
			return { header: [1, 2, 3, 4, 5, 6, false] };
		case 'list-ul':
			return { list: 'bullet' };
		case 'list-ol':
			return { list: 'ordered' };
		case 'blockquote':
			return 'blockquote';
		case 'code':
			return 'code-block';
		case 'link':
			return 'link';
		case 'font-size':
			return { size: [] };
		case 'font-family':
			return { font: [] };
		case 'text-color':
			return [{ color: [] }, { background: [] }];
		case 'text-indent':
			return [{ indent: '-1' }, { indent: '+1' }];
		case 'line-height':
			return { lineheight: [] };
		case 'letter-spacing':
			return { letterspacing: [] };
		case 'media':
			return ['image', 'video'];
		case 'emoji':
			return 'emoji';
		case 'hr':
			return 'divider';
		case 'editHtml':
			return 'editHtml';
		case 'table':
			return 'table-better';
		default:
			return null;
	}
}

export function buildQuillToolbar(controls: RichTextEditorControl[]): unknown[][] {
	const groups: unknown[][] = [];
	let current: unknown[] = [];
	for (const control of controls) {
		if (control === 'separator') {
			if (current.length > 0) {
				groups.push(current);
				current = [];
			}
			continue;
		}
		const fmt = controlToFormat(control);
		if (fmt === null) continue;
		if (Array.isArray(fmt)) {
			current.push(...fmt);
		} else {
			current.push(fmt);
		}
	}
	if (current.length > 0) {
		groups.push(current);
	}
	return groups;
}
