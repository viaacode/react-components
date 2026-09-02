export function formatTime(seconds: number): string {
	const safeSeconds = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
	const totalSeconds = Math.floor(safeSeconds);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const secs = totalSeconds % 60;
	const pad = (n: number) => String(n).padStart(2, '0');

	return hours > 0 ? `${hours}:${pad(minutes)}:${pad(secs)}` : `${minutes}:${pad(secs)}`;
}
