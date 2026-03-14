const REQUEST_TIMEOUT_MS = 5000;

type FetchWithTimeout = (url: string, init?: RequestInit) => Promise<Response>;

export const fetchWithTimeout: FetchWithTimeout = async (url, init = {}) => {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	try {
		return await fetch(url, { ...init, signal: controller.signal });
	} finally {
		clearTimeout(timeout);
	}
};

export default fetchWithTimeout;
