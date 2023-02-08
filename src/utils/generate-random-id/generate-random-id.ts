export function generateRandomId(): string {
	return Math.random().toString().substring(2, 15);
}
