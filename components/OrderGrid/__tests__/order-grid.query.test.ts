jest.mock('@/lib/orders/orders.sort', () => ({
	resolveOrdersSortBy: (value?: string) =>
		value === 'price' || value === 'timestamp' ? value : 'timestamp',
	resolveOrdersSortDir: (value?: string) =>
		value === 'asc' || value === 'desc' ? value : 'desc',
}));

import { resolveOrderGridQuery } from '../order-grid.query';

describe('order-grid.query', () => {
	it('returns defaults when query params are missing', () => {
		const result = resolveOrderGridQuery({});

		expect(result).toEqual({
			requestedPage: 1,
			sortBy: 'timestamp',
			sortDir: 'desc',
		});
	});

	it('clamps page to at least 1', () => {
		expect(resolveOrderGridQuery({ page: '0' }).requestedPage).toBe(1);
		expect(resolveOrderGridQuery({ page: '-10' }).requestedPage).toBe(1);
		expect(resolveOrderGridQuery({ page: '5' }).requestedPage).toBe(5);
	});

	it('falls back to defaults for invalid sorting params', () => {
		const result = resolveOrderGridQuery({
			sortBy: 'invalid-field',
			sortDir: 'invalid-dir',
		});

		expect(result.sortBy).toBe('timestamp');
		expect(result.sortDir).toBe('desc');
	});

	it('resolves valid sorting params', () => {
		const result = resolveOrderGridQuery({
			sortBy: 'price',
			sortDir: 'asc',
		});

		expect(result.sortBy).toBe('price');
		expect(result.sortDir).toBe('asc');
	});
});
