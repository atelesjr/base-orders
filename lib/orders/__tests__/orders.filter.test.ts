import { filterOrders, resolveOrdersGridFilters } from '../orders.filter';
import { makeOrder } from './fixtures/orders.fixture';

describe('orders.filter', () => {
	it('normalizes supported filter values', () => {
		const filters = resolveOrdersGridFilters({
			id: ' 10 ',
			instrument: ' PETR4 ',
			status: 'Executada',
			side: 'Compra',
			date: '2026-03-15',
		});

		expect(filters).toEqual({
			id: '10',
			instrument: 'PETR4',
			status: 'Executada',
			side: 'Compra',
			date: '2026-03-15',
		});
	});

	it('ignores invalid enum and date filters', () => {
		const filters = resolveOrdersGridFilters({
			status: 'Unknown',
			side: 'Both',
			date: '15-03-2026',
		});

		expect(filters).toEqual({
			id: undefined,
			instrument: undefined,
			status: undefined,
			side: undefined,
			date: undefined,
		});
	});

	it('filters by id, instrument, status, side and date', () => {
		const orders = [
			makeOrder({
				id: '1001',
				instrument: 'PETR4',
				status: 'Executada',
				side: 'Compra',
				timestamp: '2026-03-15T10:00:00Z',
			}),
			makeOrder({
				id: '1002',
				instrument: 'VALE3',
				status: 'Aberta',
				side: 'Venda',
				timestamp: '2026-03-16T10:00:00Z',
			}),
		];

		const result = filterOrders(orders, {
			id: '100',
			instrument: 'petr',
			status: 'Executada',
			side: 'Compra',
			date: '2026-03-15',
		});

		expect(result.map((order) => order.id)).toEqual(['1001']);
	});

	it('returns empty list when date filter does not match timestamp', () => {
		const result = filterOrders(
			[makeOrder({ id: '1', timestamp: 'invalid-date' })],
			{ date: '2026-03-15' },
		);

		expect(result).toEqual([]);
	});

	it('matches instrument by partial text regardless of case', () => {
		const result = filterOrders(
			[
				makeOrder({ id: '1', instrument: 'READL3' }),
				makeOrder({ id: '2', instrument: 'PETR4' }),
			],
			{ instrument: 'readl' },
		);

		expect(result.map((order) => order.id)).toEqual(['1']);
	});
});
