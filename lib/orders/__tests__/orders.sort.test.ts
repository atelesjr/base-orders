import { makeOrder } from './fixtures/orders.fixture';
import {
	getDefaultSortDirForField,
	getSortedOrders,
	isOrdersSortBy,
	resolveOrdersSortBy,
	resolveOrdersSortDir,
} from '../orders.sort';

describe('orders.sort', () => {
	describe('isOrdersSortBy', () => {
		it('returns true for all valid sort fields', () => {
			expect(isOrdersSortBy('timestamp')).toBe(true);
			expect(isOrdersSortBy('instrument')).toBe(true);
			expect(isOrdersSortBy('side')).toBe(true);
			expect(isOrdersSortBy('price')).toBe(true);
			expect(isOrdersSortBy('quantity')).toBe(true);
			expect(isOrdersSortBy('remainingQuantity')).toBe(true);
			expect(isOrdersSortBy('status')).toBe(true);
		});

		it('returns false for unknown field names', () => {
			expect(isOrdersSortBy('unknown')).toBe(false);
			expect(isOrdersSortBy('PRICE')).toBe(false);
			expect(isOrdersSortBy('')).toBe(false);
			expect(isOrdersSortBy('id')).toBe(false);
		});
	});

	describe('resolveOrdersSortBy', () => {
		it('returns default (timestamp) when value is undefined', () => {
			expect(resolveOrdersSortBy(undefined)).toBe('timestamp');
		});

		it('returns default when value is empty string', () => {
			expect(resolveOrdersSortBy('')).toBe('timestamp');
		});

		it('returns default when value is not a valid sort field', () => {
			expect(resolveOrdersSortBy('invalid')).toBe('timestamp');
			expect(resolveOrdersSortBy('PRICE')).toBe('timestamp');
		});

		it('returns the value when it is a valid sort field', () => {
			expect(resolveOrdersSortBy('price')).toBe('price');
			expect(resolveOrdersSortBy('instrument')).toBe('instrument');
			expect(resolveOrdersSortBy('side')).toBe('side');
			expect(resolveOrdersSortBy('quantity')).toBe('quantity');
			expect(resolveOrdersSortBy('remainingQuantity')).toBe('remainingQuantity');
			expect(resolveOrdersSortBy('status')).toBe('status');
			expect(resolveOrdersSortBy('timestamp')).toBe('timestamp');
		});
	});

	describe('resolveOrdersSortDir', () => {
		it('returns default (desc) when value is undefined', () => {
			expect(resolveOrdersSortDir(undefined)).toBe('desc');
		});

		it('returns default when value is not asc or desc', () => {
			expect(resolveOrdersSortDir('invalid')).toBe('desc');
			expect(resolveOrdersSortDir('')).toBe('desc');
			expect(resolveOrdersSortDir('ASC')).toBe('desc');
		});

		it('returns asc when value is asc', () => {
			expect(resolveOrdersSortDir('asc')).toBe('asc');
		});

		it('returns desc when value is desc', () => {
			expect(resolveOrdersSortDir('desc')).toBe('desc');
		});
	});

	describe('getDefaultSortDirForField', () => {
		it('returns desc for timestamp', () => {
			expect(getDefaultSortDirForField('timestamp')).toBe('desc');
		});

		it('returns asc for all other sort fields', () => {
			expect(getDefaultSortDirForField('instrument')).toBe('asc');
			expect(getDefaultSortDirForField('side')).toBe('asc');
			expect(getDefaultSortDirForField('price')).toBe('asc');
			expect(getDefaultSortDirForField('quantity')).toBe('asc');
			expect(getDefaultSortDirForField('remainingQuantity')).toBe('asc');
			expect(getDefaultSortDirForField('status')).toBe('asc');
		});
	});

	describe('getSortedOrders', () => {
		it('does not mutate the original array', () => {
			const orders = [
				makeOrder({ id: '1', price: 20 }),
				makeOrder({ id: '2', price: 10 }),
			];
			const original = [...orders];

			getSortedOrders(orders, 'price', 'asc');

			expect(orders).toEqual(original);
		});

		describe('sort by timestamp', () => {
			it('sorts ascending by timestamp', () => {
				const orders = [
					makeOrder({ id: '1', timestamp: '2026-03-15T12:00:00Z' }),
					makeOrder({ id: '2', timestamp: '2026-03-15T10:00:00Z' }),
					makeOrder({ id: '3', timestamp: '2026-03-15T11:00:00Z' }),
				];

				const result = getSortedOrders(orders, 'timestamp', 'asc');

				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});

			it('sorts descending by timestamp', () => {
				const orders = [
					makeOrder({ id: '1', timestamp: '2026-03-15T10:00:00Z' }),
					makeOrder({ id: '2', timestamp: '2026-03-15T12:00:00Z' }),
					makeOrder({ id: '3', timestamp: '2026-03-15T11:00:00Z' }),
				];

				const result = getSortedOrders(orders, 'timestamp', 'desc');

				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});
		});

		describe('sort by instrument', () => {
			it('sorts ascending alphabetically by instrument', () => {
				const orders = [
					makeOrder({ id: '1', instrument: 'VALE3' }),
					makeOrder({ id: '2', instrument: 'ABEV3' }),
					makeOrder({ id: '3', instrument: 'PETR4' }),
				];

				const result = getSortedOrders(orders, 'instrument', 'asc');

				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});

			it('sorts descending alphabetically by instrument', () => {
				const orders = [
					makeOrder({ id: '1', instrument: 'ABEV3' }),
					makeOrder({ id: '2', instrument: 'VALE3' }),
					makeOrder({ id: '3', instrument: 'PETR4' }),
				];

				const result = getSortedOrders(orders, 'instrument', 'desc');

				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});
		});

		describe('sort by side', () => {
			it('sorts ascending: Compra before Venda', () => {
				const orders = [
					makeOrder({ id: '1', side: 'Venda' }),
					makeOrder({ id: '2', side: 'Compra' }),
				];

				const result = getSortedOrders(orders, 'side', 'asc');

				expect(result.map((o) => o.id)).toEqual(['2', '1']);
			});

			it('sorts descending: Venda before Compra', () => {
				const orders = [
					makeOrder({ id: '1', side: 'Compra' }),
					makeOrder({ id: '2', side: 'Venda' }),
				];

				const result = getSortedOrders(orders, 'side', 'desc');

				expect(result.map((o) => o.id)).toEqual(['2', '1']);
			});
		});

		describe('sort by price', () => {
			it('sorts ascending by price', () => {
				const orders = [
					makeOrder({ id: '1', price: 50.0 }),
					makeOrder({ id: '2', price: 10.0 }),
					makeOrder({ id: '3', price: 30.0 }),
				];

				const result = getSortedOrders(orders, 'price', 'asc');

				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});

			it('sorts descending by price', () => {
				const orders = [
					makeOrder({ id: '1', price: 10.0 }),
					makeOrder({ id: '2', price: 50.0 }),
					makeOrder({ id: '3', price: 30.0 }),
				];

				const result = getSortedOrders(orders, 'price', 'desc');

				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});
		});

		describe('sort by quantity', () => {
			it('sorts ascending by quantity', () => {
				const orders = [
					makeOrder({ id: '1', quantity: 300 }),
					makeOrder({ id: '2', quantity: 100 }),
					makeOrder({ id: '3', quantity: 200 }),
				];

				const result = getSortedOrders(orders, 'quantity', 'asc');

				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});

			it('sorts descending by quantity', () => {
				const orders = [
					makeOrder({ id: '1', quantity: 100 }),
					makeOrder({ id: '2', quantity: 300 }),
					makeOrder({ id: '3', quantity: 200 }),
				];

				const result = getSortedOrders(orders, 'quantity', 'desc');

				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});
		});

		describe('sort by remainingQuantity', () => {
			it('sorts ascending by remainingQuantity', () => {
				const orders = [
					makeOrder({ id: '1', remainingQuantity: 300 }),
					makeOrder({ id: '2', remainingQuantity: 0 }),
					makeOrder({ id: '3', remainingQuantity: 150 }),
				];

				const result = getSortedOrders(orders, 'remainingQuantity', 'asc');

				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});

			it('sorts descending by remainingQuantity', () => {
				const orders = [
					makeOrder({ id: '1', remainingQuantity: 0 }),
					makeOrder({ id: '2', remainingQuantity: 300 }),
					makeOrder({ id: '3', remainingQuantity: 150 }),
				];

				const result = getSortedOrders(orders, 'remainingQuantity', 'desc');

				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});
		});

		describe('sort by status', () => {
			it('sorts ascending by status priority (Cancelada < Executada < Parcial < Aberta)', () => {
				const orders = [
					makeOrder({ id: '1', status: 'Aberta' }),
					makeOrder({ id: '2', status: 'Cancelada' }),
					makeOrder({ id: '3', status: 'Parcial' }),
					makeOrder({ id: '4', status: 'Executada' }),
				];

				const result = getSortedOrders(orders, 'status', 'asc');

				expect(result.map((o) => o.id)).toEqual(['2', '4', '3', '1']);
			});

			it('sorts descending by status priority (Aberta > Parcial > Executada > Cancelada)', () => {
				const orders = [
					makeOrder({ id: '1', status: 'Executada' }),
					makeOrder({ id: '2', status: 'Aberta' }),
					makeOrder({ id: '3', status: 'Cancelada' }),
					makeOrder({ id: '4', status: 'Parcial' }),
				];

				const result = getSortedOrders(orders, 'status', 'desc');

				expect(result.map((o) => o.id)).toEqual(['2', '4', '1', '3']);
			});
		});

		describe('tie-breaking', () => {
			it('breaks ties by timestamp descending when primary sort values are equal', () => {
				const orders = [
					makeOrder({
						id: '1',
						price: 10,
						timestamp: '2026-03-15T10:00:00Z',
					}),
					makeOrder({
						id: '2',
						price: 10,
						timestamp: '2026-03-15T12:00:00Z',
					}),
					makeOrder({
						id: '3',
						price: 10,
						timestamp: '2026-03-15T11:00:00Z',
					}),
				];

				const result = getSortedOrders(orders, 'price', 'asc');

				// All prices equal → tie-break by timestamp desc
				expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
			});

			it('breaks ties by id descending (numeric) when timestamp is also equal', () => {
				const sameTimestamp = '2026-03-15T10:00:00Z';
				const orders = [
					makeOrder({ id: '1', price: 10, timestamp: sameTimestamp }),
					makeOrder({ id: '3', price: 10, timestamp: sameTimestamp }),
					makeOrder({ id: '2', price: 10, timestamp: sameTimestamp }),
				];

				const result = getSortedOrders(orders, 'price', 'asc');

				// All equal → tie-break by id desc numerically
				expect(result.map((o) => o.id)).toEqual(['3', '2', '1']);
			});
		});

		it('returns empty array when given empty input', () => {
			const result = getSortedOrders([], 'price', 'asc');

			expect(result).toEqual([]);
		});

		it('returns single-element array unchanged', () => {
			const order = makeOrder({ id: '1', price: 42 });

			const result = getSortedOrders([order], 'price', 'asc');

			expect(result).toHaveLength(1);
			expect(result[0].id).toBe('1');
		});
	});
});