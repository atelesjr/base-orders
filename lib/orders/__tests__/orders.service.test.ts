import { findAllOrders } from '../orders.repository';
import {
	getOrdersForGrid,
	getPaginatedOrdersForGrid,
} from '../orders.service';
import { makeOrder, makeOrders } from './fixtures/orders.fixture';

jest.mock('../orders.repository', () => ({
	findAllOrders: jest.fn(),
}));

const mockedFindAllOrders = findAllOrders as jest.MockedFunction<
	typeof findAllOrders
>;

describe('orders.service', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('sorts orders by timestamp descending', async () => {
		mockedFindAllOrders.mockResolvedValue([
			makeOrder({ id: '1', timestamp: '2026-03-15T10:00:00Z' }),
			makeOrder({ id: '2', timestamp: '2026-03-15T12:00:00Z' }),
			makeOrder({ id: '3', timestamp: '2026-03-15T11:00:00Z' }),
		]);

		const result = await getOrdersForGrid();

		expect(result.map((order) => order.id)).toEqual(['2', '3', '1']);
	});

	it('returns first page when requested page is invalid', async () => {
		mockedFindAllOrders.mockResolvedValue(makeOrders(20));

		const result = await getPaginatedOrdersForGrid(Number.NaN, 15);

		expect(result.currentPage).toBe(1);
		expect(result.totalPages).toBe(2);
		expect(result.items).toHaveLength(15);
		expect(result.prevPage).toBeUndefined();
		expect(result.nextPage).toBe(2);
	});

	it('clamps page when requested page exceeds total pages', async () => {
		mockedFindAllOrders.mockResolvedValue(makeOrders(31));

		const result = await getPaginatedOrdersForGrid(99, 15);

		expect(result.currentPage).toBe(3);
		expect(result.totalPages).toBe(3);
		expect(result.items).toHaveLength(1);
		expect(result.prevPage).toBe(2);
		expect(result.nextPage).toBeUndefined();
	});

	it('returns single page metadata when there are no orders', async () => {
		mockedFindAllOrders.mockResolvedValue([]);

		const result = await getPaginatedOrdersForGrid(1, 15);

		expect(result.currentPage).toBe(1);
		expect(result.totalPages).toBe(1);
		expect(result.items).toEqual([]);
		expect(result.prevPage).toBeUndefined();
		expect(result.nextPage).toBeUndefined();
	});

	it('sorts by price ascending before pagination', async () => {
		mockedFindAllOrders.mockResolvedValue([
			makeOrder({ id: '1', price: 15.2 }),
			makeOrder({ id: '2', price: 9.5 }),
			makeOrder({ id: '3', price: 11.0 }),
		]);

		const result = await getPaginatedOrdersForGrid(1, 15, 'price', 'asc');

		expect(result.items.map((order) => order.id)).toEqual(['2', '3', '1']);
	});

	it('sorts by status descending using market priority', async () => {
		mockedFindAllOrders.mockResolvedValue([
			makeOrder({ id: '1', status: 'Executada' }),
			makeOrder({ id: '2', status: 'Aberta' }),
			makeOrder({ id: '3', status: 'Cancelada' }),
			makeOrder({ id: '4', status: 'Parcial' }),
		]);

		const result = await getPaginatedOrdersForGrid(1, 15, 'status', 'desc');

		expect(result.items.map((order) => order.id)).toEqual(['2', '4', '1', '3']);
	});
});
