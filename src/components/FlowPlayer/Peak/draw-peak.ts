import { WaveformData } from 'waveform-data';

export function drawPeak(
	canvas: HTMLCanvasElement,
	waveformData: WaveformData,
	percentagePlayed: number
) {
	const ctx = canvas.getContext('2d');

	if (!ctx || !waveformData) {
		return;
	}

	const numOfBars = 100;
	const barWidth = canvas.width / 100 / 2;

	// Convert the waveform amplitude to bar height
	const scaleY = (amplitude: number, height: number) => {
		const range = 128;
		const offset = 64;

		return height - ((amplitude + offset) * height) / range;
	};

	// Reset the canvas
	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect(0, 0, canvas.width || 0, canvas.height || 0);

	const channel = waveformData.channel(0);
	const half = (canvas.height || 0) / 2;

	const waveFormLength = waveformData.length;

	// Draw the peak bars
	for (let barIndex = 0; barIndex < numOfBars; barIndex++) {
		const val = channel.max_sample((waveFormLength / numOfBars) * barIndex);
		const h = scaleY(val, half);

		// Change color for already played audio
		const percentageDrawn = barIndex / numOfBars;
		if (percentageDrawn > percentagePlayed) {
			ctx.fillStyle = '#ADADAD';
		} else {
			ctx.fillStyle = '#00c8aa';
		}

		ctx.fillRect((canvas.width / numOfBars) * barIndex, half - h, barWidth, h * 2);
	}
}
