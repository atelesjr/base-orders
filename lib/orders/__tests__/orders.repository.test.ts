import { env } from '@/lib/shared/env';
import { fetchWithTimeout } from '@/lib/shared/fetch-with-timeout';
import { makeOrder } from './fixtures/orders.fixture';
import { findAllOrders, findOrderById } from '../orders.repository';

jest.mock('@/lib/shared/fetch-with-timeout', () => ({
	fetchWithTimeout: jest.fn(),
}));

jest.mock('@/lib/shared/env', () => ({
	env: {
		apiBaseUrl: 'http://localhost:3001',
	},
}));

const mockedFetchWithTimeout = fetchWithTimeout as jest.MockedFunction<
	typeof fetchWithTimeout
>;

describe('orders.repository', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('fetches all orders', async () => {
		const mockOrders = [makeOrder({ id: '1' }), makeOrder({ id: '2' })];
		mockedFetchWithTimeout.mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => mockOrders,
		} as Response);

		const result = await findAllOrders();

		expect(mockedFetchWithTimeout).toHaveBeenCalledWith(
			`${env.apiBaseUrl}/orders`,
			{ cache: 'no-store' },
		);
		expect(result).toEqual(mockOrders);
	});

	it('throws when fetch all orders fails', async () => {
		mockedFetchWithTimeout.mockResolvedValue({
			ok: false,
			status: 500,
			json: async () => ({}),
		} as Response);

		await expect(findAllOrders()).rejects.toThrow('Failed to fetch orders: 500');
	});

	it('fetches order by id', async () => {
		const mockOrder = makeOrder({ id: '10' });
		mockedFetchWithTimeout.mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => mockOrder,
		} as Response);

		const result = await findOrderById('10');

		expect(mockedFetchWithTimeout).toHaveBeenCalledWith(
			`${env.apiBaseUrl}/orders/10`,
			{ cache: 'no-store' },
		);
		expect(result).toEqual(mockOrder);
	});

	it('returns null when order is not found', async () => {
		mockedFetchWithTimeout.mockResolvedValue({
			ok: false,
			status: 404,
			json: async () => ({}),
		} as Response);

		const result = await findOrderById('999');

		expect(result).toBeNull();
	});

	it('throws when find by id fails with non-404', async () => {
		mockedFetchWithTimeout.mockResolvedValue({
			ok: false,
			status: 503,
			json: async () => ({}),
		} as Response);

		await expect(findOrderById('10')).rejects.toThrow(
			'Failed to fetch order 10: 503',
		);
	});
});
