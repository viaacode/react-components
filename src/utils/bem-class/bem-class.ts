export function bemCls(this: string, element?: string, modifier?: string) {
	return `${this}${element ? `__${element}` : ''}${modifier ? `--${modifier}` : ''}`;
}
