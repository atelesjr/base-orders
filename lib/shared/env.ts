import 'server-only';

export const env = {
	apiBaseUrl:
		process.env.INTERNAL_API_BASE_URL ??
		(process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : ''),
};

if (!env.apiBaseUrl) {
	throw new Error('Missing INTERNAL_API_BASE_URL');
}
