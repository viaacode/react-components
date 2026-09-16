import { fireEvent, render } from '@testing-library/react';
import { VolumeBars, type VolumeBarsProps } from './VolumeBars';

const renderVolumeBars = (overrides: Partial<VolumeBarsProps> = {}) =>
	render(<VolumeBars value={35} onChange={jest.fn()} ariaLabel="Volume" {...overrides} />);

const getSlider = (container: HTMLElement) =>
	container.querySelector('[role="slider"]') as HTMLElement;

const countFilled = (container: HTMLElement) =>
	container.querySelectorAll('.c-flowplayer-volume-bars__bar--filled').length;

describe('<VolumeBars />', () => {
	it('rounds the filled bar count like Flowplayer does, rather than flooring it', () => {
		// Native: `Math.round(volume * ticks.length)` - 35% of 10 bars lights 4, not 3.
		expect(countFilled(renderVolumeBars({ value: 35 }).container)).toBe(4);
		expect(countFilled(renderVolumeBars({ value: 34 }).container)).toBe(3);
		expect(countFilled(renderVolumeBars({ value: 0 }).container)).toBe(0);
		expect(countFilled(renderVolumeBars({ value: 100 }).container)).toBe(10);
	});

	it("moves by 15 per arrow press, matching Flowplayer's own keyboard step", () => {
		const onChange = jest.fn();
		const { container } = renderVolumeBars({ value: 50, onChange });

		fireEvent.keyDown(getSlider(container), { key: 'ArrowRight' });
		fireEvent.keyDown(getSlider(container), { key: 'ArrowUp' });
		fireEvent.keyDown(getSlider(container), { key: 'ArrowLeft' });
		fireEvent.keyDown(getSlider(container), { key: 'ArrowDown' });

		expect(onChange.mock.calls.map(([value]) => value)).toEqual([65, 65, 35, 35]);
	});

	it('clamps at both ends', () => {
		const onChange = jest.fn();
		const { container } = renderVolumeBars({ value: 95, onChange });

		fireEvent.keyDown(getSlider(container), { key: 'ArrowUp' });

		expect(onChange).toHaveBeenCalledWith(100);

		const low = renderVolumeBars({ value: 5, onChange });
		fireEvent.keyDown(getSlider(low.container), { key: 'ArrowDown' });

		expect(onChange).toHaveBeenLastCalledWith(0);
	});

	it('ignores Home/End - Flowplayer has no such volume shortcut', () => {
		const onChange = jest.fn();
		const { container } = renderVolumeBars({ onChange });

		fireEvent.keyDown(getSlider(container), { key: 'Home' });
		fireEvent.keyDown(getSlider(container), { key: 'End' });

		expect(onChange).not.toHaveBeenCalled();
	});

	it("stops handled keys from reaching Flowplayer's global keyboard plugin", () => {
		const onParentKeyDown = jest.fn();
		const { container } = render(
			// biome-ignore lint/a11y/noStaticElementInteractions: mirrors ControlBar's delegating wrapper
			<div onKeyDown={onParentKeyDown}>
				<VolumeBars value={35} onChange={jest.fn()} ariaLabel="Volume" />
			</div>
		);

		fireEvent.keyDown(getSlider(container), { key: 'ArrowUp' });
		expect(onParentKeyDown).not.toHaveBeenCalled();

		fireEvent.keyDown(getSlider(container), { key: 'Home' });
		expect(onParentKeyDown).toHaveBeenCalledTimes(1);
	});

	it("exposes Flowplayer's 0-1 slider scale with an announceable percentage", () => {
		const { container } = renderVolumeBars({ value: 35 });

		expect(getSlider(container)).toHaveAttribute('aria-valuemin', '0');
		expect(getSlider(container)).toHaveAttribute('aria-valuemax', '1');
		expect(getSlider(container)).toHaveAttribute('aria-valuenow', '0.35');
		expect(getSlider(container)).toHaveAttribute('aria-valuetext', '35%');
	});
});
