export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
	let timeout: NodeJS.Timeout | null = null;
	return function (this: any, ...args: Parameters<T>) {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => fn.apply(this, args), delay);
	} as T;
}
