const REQUEST_TIMEOUT_MS = 5000;

type FetchWithTimeout = (url: string, init?: RequestInit) => Promise<Response>;

type ComposedSignal = {
	signal: AbortSignal;
	cleanup: () => void;
};

const composeAbortSignals = (
	callerSignal?: AbortSignal | null,
	timeoutSignal?: AbortSignal | null,
): ComposedSignal => {
	if (!callerSignal && !timeoutSignal) {
		return { signal: new AbortController().signal, cleanup: () => {} };
	}

	if (!callerSignal) {
		return { signal: timeoutSignal as AbortSignal, cleanup: () => {} };
	}

	if (!timeoutSignal) {
		return { signal: callerSignal, cleanup: () => {} };
	}

	if (typeof AbortSignal.any === 'function') {
		return {
			signal: AbortSignal.any([callerSignal, timeoutSignal]),
			cleanup: () => {},
		};
	}

	const controller = new AbortController();
	const onAbort = () => controller.abort();

	if (callerSignal.aborted || timeoutSignal.aborted) {
		onAbort();
		return { signal: controller.signal, cleanup: () => {} };
	}

	callerSignal.addEventListener('abort', onAbort, { once: true });
	timeoutSignal.addEventListener('abort', onAbort, { once: true });

	return {
		signal: controller.signal,
		cleanup: () => {
			callerSignal.removeEventListener('abort', onAbort);
			timeoutSignal.removeEventListener('abort', onAbort);
		},
	};
};

export const fetchWithTimeout: FetchWithTimeout = async (url, init = {}) => {
	const timeoutController = new AbortController();
	const timeout = setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT_MS);
	const composed = composeAbortSignals(init.signal, timeoutController.signal);

	try {
		return await fetch(url, { ...init, signal: composed.signal });
	} finally {
		clearTimeout(timeout);
		composed.cleanup();
	}
};

export default fetchWithTimeout;
