export type Language = 'en' | 'nl';

export type EnglishContentType =
	| 'collection'
	| 'item'
	| 'bundle'
	| 'video'
	| 'audio'
	| 'search'
	| 'searchquery';

export type DutchContentType =
	| 'collectie'
	| 'item'
	| 'bundel'
	| 'video'
	| 'audio'
	| 'zoek'
	| 'zoekopdracht';

export interface ContentType {
	en: EnglishContentType;
	nl: DutchContentType;
}

export const contentTypes: ContentType[] = [
	{
		en: 'collection',
		nl: 'collectie',
	},
	{
		en: 'item',
		nl: 'item',
	},
	{
		en: 'audio',
		nl: 'audio',
	},
	{
		en: 'video',
		nl: 'video',
	},
	{
		en: 'bundle',
		nl: 'bundel',
	},
	{
		en: 'search',
		nl: 'zoek',
	},
	{
		en: 'searchquery',
		nl: 'zoekopdracht',
	},
];

export const translateContentType = (value: string, from: Language, toEnglish: boolean) => {
	const type = contentTypes.find((contentType) => contentType[from] === value);
	const to: Language = toEnglish ? 'en' : 'nl';

	return type ? type[to] : `${value}.${to}`;
};
