import { fetchWithTimeout } from '../fetch-with-timeout';

describe('fetchWithTimeout', () => {
	const originalFetch = globalThis.fetch;

	beforeEach(() => {
		jest.useFakeTimers();
		Object.defineProperty(globalThis, 'fetch', {
			value: jest.fn(),
			writable: true,
			configurable: true,
		});
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.restoreAllMocks();
		if (originalFetch) {
			Object.defineProperty(globalThis, 'fetch', {
				value: originalFetch,
				writable: true,
				configurable: true,
			});
		} else {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			delete (globalThis as any).fetch;
		}
	});

	it('returns fetch response and passes signal/init options', async () => {
		const response = { ok: true, status: 200 } as Response;
		const fetchMock = globalThis.fetch as jest.MockedFunction<typeof fetch>;
		fetchMock.mockResolvedValue(response);

		const result = await fetchWithTimeout('http://localhost:3001/orders', {
			cache: 'no-store',
		});

		expect(result).toBe(response);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledWith(
			'http://localhost:3001/orders',
			expect.objectContaining({
				cache: 'no-store',
				signal: expect.any(AbortSignal),
			}),
		);
	});

	it('aborts request after timeout', async () => {
		const abortError = new DOMException('The operation was aborted.', 'AbortError');

		const fetchMock = globalThis.fetch as jest.MockedFunction<typeof fetch>;
		fetchMock.mockImplementation((_url, init) => {
			return new Promise((_, reject) => {
				(init?.signal as AbortSignal | undefined)?.addEventListener('abort', () =>
					reject(abortError),
				);
			});
		});

		const promise = fetchWithTimeout('http://localhost:3001/orders');
		const assertion = expect(promise).rejects.toThrow(
			'The operation was aborted.',
		);
		await jest.advanceTimersByTimeAsync(5000);

		await assertion;
	});

	it('clears timeout in finally even when fetch fails', async () => {
		const clearTimeoutSpy = jest.spyOn(globalThis, 'clearTimeout');
		const fetchMock = globalThis.fetch as jest.MockedFunction<typeof fetch>;
		fetchMock.mockRejectedValue(new Error('network failed'));

		await expect(fetchWithTimeout('http://localhost:3001/orders')).rejects.toThrow(
			'network failed',
		);
		expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
	});
});
