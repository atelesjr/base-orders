import type { Order } from '../../orders.types';

export const makeOrder = (overrides: Partial<Order> = {}): Order => ({
	id: '1',
	instrument: 'PETR4',
	side: 'Compra',
	price: 34.5,
	quantity: 100,
	remainingQuantity: 0,
	status: 'Executada',
	timestamp: '2026-03-15T10:00:00Z',
	statusHistory: [
		{ status: 'Aberta', updatedAt: '2026-03-15T10:00:00Z' },
		{ status: 'Executada', updatedAt: '2026-03-15T10:05:00Z' },
	],
	...overrides,
});

export const makeOrders = (count: number): Order[] =>
	Array.from({ length: count }, (_, index) =>
		makeOrder({
			id: String(index + 1),
			timestamp: new Date(2026, 2, 15, 10, index, 0).toISOString(),
		}),
	);
