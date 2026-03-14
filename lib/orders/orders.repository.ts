import 'server-only';
import { fetchWithTimeout } from '@/lib/shared/fetch-with-timeout';
import { env } from '@/lib/shared/env';
import type { Order } from './orders.types';

export const findAllOrders: () => Promise<Order[]> = async () => {
	const response = await fetchWithTimeout(`${env.apiBaseUrl}/orders`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch orders: ${response.status}`);
	}

	return response.json();
};

type FindOrdersByStatus = (status: string) => Promise<Order | null>;

export const findOrderById: FindOrdersByStatus = async (id) => {
	const response = await fetchWithTimeout(`${env.apiBaseUrl}/orders/${id}`, {
		cache: 'no-store',
	});

	if (response.status === 404) return null;
	if (!response.ok)
		throw new Error(`Failed to fetch order ${id}: ${response.status}`);

	return response.json();
};
