import { KeyValuePairs } from './KeyValueEditor';
import translations from './nl.json';

export const DATA_ARRAY_MOCK: KeyValuePairs = [
	['setting1', 'value1'],
	['setting2', 'value2'],
	['setting3', 'value3'],
];

export const DATA_OBJ_MOCK = translations as { [key: string]: string };
