import { cleanup, render } from '@testing-library/react';

import { AudioWaveFormDisplay } from './AudioWaveFormDisplay';
import { AudioWaveFormDisplaySize } from './AudioWaveFormDisplay.helpers';

afterEach(() => {
	cleanup();
});

describe('<AudioWaveFormDisplay />', () => {
	it('should be able to render', () => {
		render(<AudioWaveFormDisplay />);
	});

	it('should render the large size with twice as many bars as the small size', () => {
		const { container: small } = render(
			<AudioWaveFormDisplay size={AudioWaveFormDisplaySize.Small} />
		);
		const { container: large } = render(
			<AudioWaveFormDisplay size={AudioWaveFormDisplaySize.Large} />
		);

		const smallBarCount = small.querySelectorAll('.c-audio-wave-form-display__bar').length;
		const largeBarCount = large.querySelectorAll('.c-audio-wave-form-display__bar').length;

		expect(largeBarCount).toBe(smallBarCount * 2);
	});

	it('should leave the wave color CSS variable unset when none is given, falling back to the SCSS default', () => {
		const { container } = render(<AudioWaveFormDisplay />);
		const outer = container.querySelector('.c-audio-wave-form-display') as HTMLElement;

		expect(outer.style.getPropertyValue('--c-audio-wave-form-display-wave-color')).toBe('');
	});

	it('should pass the given wave and background colors through as CSS variables', () => {
		const { container } = render(
			<AudioWaveFormDisplay waveColor="#00c8aa" backgroundColor="#1d1d1d" />
		);
		const outer = container.querySelector('.c-audio-wave-form-display') as HTMLElement;

		expect(outer.style.getPropertyValue('--c-audio-wave-form-display-wave-color')).toBe('#00c8aa');
		expect(outer.style.getPropertyValue('--c-audio-wave-form-display-bg')).toBe('#1d1d1d');
	});

	it('should pass the given className through', () => {
		const { container } = render(<AudioWaveFormDisplay className="my-extra-class" />);

		expect(container.querySelector('.c-audio-wave-form-display.my-extra-class')).not.toBeNull();
	});
});
