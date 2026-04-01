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

	it('preserves filters in generated href', () => {
		const href = buildOrderGridHref(1, 'timestamp', 'desc', {
			id: '1001',
			instrument: 'PETR4',
			status: 'Executada',
			side: 'Compra',
			date: '2026-03-15',
		});

		expect(href).toBe(
			'/?page=1&sortBy=timestamp&sortDir=desc&id=1001&instrument=PETR4&status=Executada&side=Compra&date=2026-03-15',
		);
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

	it('keeps active filters when generating sort links', () => {
		const links = buildOrderGridSortLinks('price', 'asc', {
			instrument: 'VALE3',
			status: 'Aberta',
		});

		expect(links.price).toBe(
			'/?page=1&sortBy=price&sortDir=desc&instrument=VALE3&status=Aberta',
		);
		expect(links.timestamp).toBe(
			'/?page=1&sortBy=timestamp&sortDir=desc&instrument=VALE3&status=Aberta',
		);
	});
});
