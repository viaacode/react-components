import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import Table from 'braft-extensions/dist/table';
import 'braft-extensions/dist/table.css';
import clsx from 'clsx';
import React, { FunctionComponent } from 'react';

import './RichTextEditor.scss';
import { RichEditorStateSchema, RichTextEditorPropsSchema } from './RichTextEditor.types';

const RichTextEditorInternal: FunctionComponent<RichTextEditorPropsSchema> = ({
	id,
	initialHtml,
	state,
	placeholder,
	controls,
	disabled,
	media,
	onFocus,
	onBlur,
	onChange,
	onTab,
	onDelete,
	onSave,
	rootClassName: root = 'c-rich-text-editor',
	className,
}) => {
	const options = {
		defaultColumns: 3, //  default number of columns
		defaultRows: 3, //  default number of rows
		withDropdown: true, //  Whether a drop-down menu pops up before inserting a table
		columnResizable: false, //  Whether to allow drag to adjust the column width, default false
		exportAttrString: 'class="c-editor-table"', //  Specify the attribute string attached to the table tag when outputting HTML
	};

	BraftEditor.use(Table(options));

	const getLanguage = (languages: any, context: string): any => {
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
				cancel: 'Annueer',
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
				externalInputTip: 'Splits bron naam en brond URL met "|", bevestig met enter.',
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
		return languages['nl'] || languages['en'];
	};

	return (
		<div className={clsx(root, className, 'c-content', { disabled })} id={id}>
			<BraftEditor
				id={id}
				value={state || BraftEditor.createEditorState(initialHtml || '')}
				placeholder={placeholder}
				readOnly={disabled}
				language={getLanguage}
				controls={controls}
				media={media}
				onChange={(newState: RichEditorStateSchema) => {
					if (onChange) {
						onChange(newState);
					}
				}}
				onBlur={() => {
					if (onBlur) {
						onBlur();
					}
				}}
				onFocus={onFocus}
				onTab={onTab}
				onDelete={onDelete}
				onSave={() => {
					if (!state) {
						return;
					}
					if (onSave) {
						onSave();
					}
				}}
			/>
		</div>
	);
};

export default RichTextEditorInternal;
