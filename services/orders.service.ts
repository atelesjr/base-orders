import { Order } from '@/types';

const API_BASE_URL =
	process.env.INTERNAL_API_BASE_URL ??
	process.env.API_BASE_URL ??
	'http://localhost:3001';

const REQUEST_TIMEOUT_MS = 5000;

async function fetchWithTimeout(url: string, init: RequestInit = {}) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	try {
		return await fetch(url, { ...init, signal: controller.signal });
	} finally {
		clearTimeout(timeout);
	}
}

export const ordersService = {
	async getOrders(): Promise<Order[]> {
		try {
			const response = await fetchWithTimeout(`${API_BASE_URL}/orders`, {
				cache: 'no-store', // Disable caching for real-time data
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching orders:', error);
			throw error;
		}
	},

	async getOrderById(id: string): Promise<Order | null> {
		try {
			const response = await fetchWithTimeout(`${API_BASE_URL}/orders/${id}`, {
				cache: 'no-store',
			});

			if (!response.ok) {
				if (response.status === 404) return null;
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching order ${id}:`, error);
			throw error;
		}
	},
};
