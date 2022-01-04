import { TagOption } from '../TagList.types';

export const tags: TagOption[] = [
	{ label: 'Aluminium', id: 'aluminium' },
	{ label: 'Cadmium', id: 'cadmium' },
	{ label: 'Dubnium', id: 'dubnium' },
	{ label: 'Potassium', id: 'potassium' },
	{ label: 'Vanadium', id: 'vanadium' },
	{ label: 'Palladium', id: 'palladium' },
	{ label: 'Polonium', id: 'polonium' },
	{ label: 'Rhodium', id: 'rhodium' },
	{ label: 'Yttrium', id: 'yttrium' },
	{ label: 'Uranium', id: 'uranium' },
];

export const colorTags: TagOption[] = [
	{ label: 'Aluminium', id: 'aluminium', color: '#FF0000' },
	{ label: 'Cadmium', id: 'cadmium', color: '#FF7F00' },
	{ label: 'Dubnium', id: 'dubnium', color: '#FFFF00' },
	{ label: 'Potassium', id: 'potassium', color: '#00FF00' },
	{ label: 'Vanadium', id: 'vanadium', color: '#0000FF' },
	{ label: 'Palladium', id: 'palladium', color: '#4B0082' },
	{ label: 'Polonium', id: 'polonium', color: '#8B00FF' },
	// Tags without a color will get a default swatch color
	{ label: 'Rhodium', id: 'rhodium' },
	{ label: 'Yttrium', id: 'yttrium' },
	{ label: 'Uranium', id: 'uranium' },
];
