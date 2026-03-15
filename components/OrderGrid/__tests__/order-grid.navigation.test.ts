jest.mock('@/lib/orders/orders.sort', () => ({
	getDefaultSortDirForField: (field: string) =>
		field === 'timestamp' ? 'desc' : 'asc',
}));

import {
	buildOrderGridHref,
	buildOrderGridSortLinks,
	getNextSortDir,
} from '../order-grid.navigation';

describe('order-grid.navigation', () => {
	it('builds grid href with page and sorting params', () => {
		const href = buildOrderGridHref(3, 'price', 'asc');

		expect(href).toBe('/?page=3&sortBy=price&sortDir=asc');
	});

	it('toggles direction when sorting same field', () => {
		expect(getNextSortDir('price', 'asc', 'price')).toBe('desc');
		expect(getNextSortDir('price', 'desc', 'price')).toBe('asc');
	});

	it('uses field default direction when sorting a different field', () => {
		expect(getNextSortDir('timestamp', 'desc', 'price')).toBe('asc');
		expect(getNextSortDir('price', 'asc', 'timestamp')).toBe('desc');
	});

	it('builds sort links for all sortable fields', () => {
		const links = buildOrderGridSortLinks('price', 'asc');

		expect(links.instrument).toBe('/?page=1&sortBy=instrument&sortDir=asc');
		expect(links.side).toBe('/?page=1&sortBy=side&sortDir=asc');
		expect(links.price).toBe('/?page=1&sortBy=price&sortDir=desc');
		expect(links.quantity).toBe('/?page=1&sortBy=quantity&sortDir=asc');
		expect(links.remainingQuantity).toBe(
			'/?page=1&sortBy=remainingQuantity&sortDir=asc',
		);
		expect(links.status).toBe('/?page=1&sortBy=status&sortDir=asc');
		expect(links.timestamp).toBe('/?page=1&sortBy=timestamp&sortDir=desc');
	});

	it('always resets to page 1 in sort links regardless of current page', () => {
		const links = buildOrderGridSortLinks('instrument', 'asc');

		// All links should point to page=1
		Object.values(links).forEach((href) => {
			expect(href).toMatch(/page=1/);
		});
	});

	it('builds sort links when timestamp is the active sort field', () => {
		const links = buildOrderGridSortLinks('timestamp', 'desc');

		// timestamp is active with desc → next click should go asc
		expect(links.timestamp).toBe('/?page=1&sortBy=timestamp&sortDir=asc');
		// other fields use their default direction (asc)
		expect(links.price).toBe('/?page=1&sortBy=price&sortDir=asc');
		expect(links.instrument).toBe('/?page=1&sortBy=instrument&sortDir=asc');
	});

	it('builds href with page 1', () => {
		const href = buildOrderGridHref(1, 'instrument', 'desc');

		expect(href).toBe('/?page=1&sortBy=instrument&sortDir=desc');
	});
});