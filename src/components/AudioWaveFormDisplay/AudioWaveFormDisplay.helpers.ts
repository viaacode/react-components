export type AudioWaveFormDisplaySize = 'small' | 'large';

export interface WaveFormBar {
	x: number;
	y1: number;
	y2: number;
}

// Bar geometry traced from the original design asset.
const WAVE_FORM_VIEW_BOX_WIDTH = 92;
const WAVE_FORM_VIEW_BOX_HEIGHT = 44;
const WAVE_FORM_CENTER_Y = 21.6;
const WAVE_FORM_FIRST_BAR_X = 0.9;
const WAVE_FORM_BAR_SPACING = 3;
export const WAVE_FORM_STROKE_WIDTH = 1.8;

// Padding around the bars, baked into the viewBox rather than CSS padding so it can't collapse
// to zero on a short/narrow container.
const WAVE_FORM_PADDING_X_RATIO = 0.15;
const WAVE_FORM_PADDING_Y_RATIO = 0.3;

// Exported so PeakDisplay.tsx can account for this padding in its own clip-path math - otherwise
// the played/unplayed reveal "plays through" blank space before any bar is visible.
export const WAVE_FORM_PADDING_X_PERCENT = WAVE_FORM_PADDING_X_RATIO * 100;

// Half the height of each bar (viewBox units), left to right, traced from the original asset.
const WAVE_FORM_BAR_HALF_HEIGHTS: readonly number[] = [
	0.3, 3.3, 3.3, 6.9, 3.3, 6.9, 13.5, 20.7, 10.5, 6.9, 17.1, 13.5, 10.5, 3.3, 6.9, 3.3, 3.3, 6.9,
	10.5, 13.5, 6.9, 3.3, 3.3, 6.9, 3.3, 3.3, 6.9, 3.3, 3.3, 1.5,
];

const WAVE_FORM_BAR_COUNT = WAVE_FORM_BAR_HALF_HEIGHTS.length;

// Right margin the reference asset leaves after its last bar, reused to size the large viewBox.
const WAVE_FORM_RIGHT_MARGIN =
	WAVE_FORM_VIEW_BOX_WIDTH - (WAVE_FORM_FIRST_BAR_X + (WAVE_FORM_BAR_COUNT - 1) * WAVE_FORM_BAR_SPACING);

function buildWaveFormBars(barCount: number, halfHeightAt: (index: number) => number): WaveFormBar[] {
	return Array.from({ length: barCount }, (_, index) => {
		const x = WAVE_FORM_FIRST_BAR_X + index * WAVE_FORM_BAR_SPACING;
		const halfHeight = halfHeightAt(index);
		return { x, y1: WAVE_FORM_CENTER_Y - halfHeight, y2: WAVE_FORM_CENTER_Y + halfHeight };
	});
}

function getWaveFormViewBoxWidth(barCount: number): number {
	return WAVE_FORM_FIRST_BAR_X + (barCount - 1) * WAVE_FORM_BAR_SPACING + WAVE_FORM_RIGHT_MARGIN;
}

const SMALL_WAVE_FORM_BARS: readonly WaveFormBar[] = buildWaveFormBars(
	WAVE_FORM_BAR_COUNT,
	(index) => WAVE_FORM_BAR_HALF_HEIGHTS[index]
);

// Large: the small waveform immediately followed by its own mirror, on one continuous grid.
const LARGE_WAVE_FORM_BARS: readonly WaveFormBar[] = buildWaveFormBars(
	WAVE_FORM_BAR_COUNT * 2,
	(index) => WAVE_FORM_BAR_HALF_HEIGHTS[index < WAVE_FORM_BAR_COUNT ? index : WAVE_FORM_BAR_COUNT * 2 - 1 - index]
);

export function getWaveFormBars(size: AudioWaveFormDisplaySize): readonly WaveFormBar[] {
	return size === 'large' ? LARGE_WAVE_FORM_BARS : SMALL_WAVE_FORM_BARS;
}

// Expands the bars' bounding box to the full display box, per the padding ratios above.
export function getWaveFormViewBox(size: AudioWaveFormDisplaySize): string {
	const contentWidth = getWaveFormViewBoxWidth(getWaveFormBars(size).length);
	const contentHeight = WAVE_FORM_VIEW_BOX_HEIGHT;

	const width = contentWidth / (1 - 2 * WAVE_FORM_PADDING_X_RATIO);
	const height = contentHeight / (1 - 2 * WAVE_FORM_PADDING_Y_RATIO);
	const minX = -(width - contentWidth) / 2;
	const minY = -(height - contentHeight) / 2;
	return `${minX} ${minY} ${width} ${height}`;
}
