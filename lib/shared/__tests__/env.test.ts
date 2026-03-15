describe('env', () => {
	const originalEnv = process.env;

	afterEach(() => {
		process.env = { ...originalEnv };
		jest.resetModules();
	});

	it('uses INTERNAL_API_BASE_URL when provided', async () => {
		process.env = {
			...originalEnv,
			NODE_ENV: 'test',
			INTERNAL_API_BASE_URL: 'http://internal-api:3001',
		};

		const { env } = await import('../env');
		expect(env.apiBaseUrl).toBe('http://internal-api:3001');
	});

	it('falls back to localhost in development when INTERNAL_API_BASE_URL is missing', async () => {
		process.env = {
			...originalEnv,
			NODE_ENV: 'development',
		};
		delete process.env.INTERNAL_API_BASE_URL;

		const { env } = await import('../env');
		expect(env.apiBaseUrl).toBe('http://localhost:3001');
	});

	it('throws when INTERNAL_API_BASE_URL is missing outside development', async () => {
		process.env = {
			...originalEnv,
			NODE_ENV: 'test',
		};
		delete process.env.INTERNAL_API_BASE_URL;

		await expect(import('../env')).rejects.toThrow('Missing INTERNAL_API_BASE_URL');
	});
});
