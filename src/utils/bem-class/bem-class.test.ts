import { bemCls } from './bem-class';

const blockClass = 'block';
const bem = bemCls.bind(blockClass);

describe('utils/bem-class', () => {
	it('Should bind the block class', () => {
		expect(bem()).toBe(blockClass);
	});

	it('Should set an element class', () => {
		const elementClass = 'element';
		expect(bem(elementClass)).toBe(`${blockClass}__${elementClass}`);
	});

	it('Should set a modifier class', () => {
		const modifierClass = 'modifier';
		expect(bem('', modifierClass)).toBe(`${blockClass}--${modifierClass}`);
	});

	it('Should set a element with modifier class', () => {
		const el = 'el';
		const mod = 'mod';
		expect(bem(el, mod)).toBe(`${blockClass}__${el}--${mod}`);
	});
});
