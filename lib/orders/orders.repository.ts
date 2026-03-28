import 'server-only';
import { fetchWithTimeout } from '@/lib/shared/fetch-with-timeout';
import { env } from '@/lib/shared/env';
import type { Order } from './orders.types';

export const findAllOrders: () => Promise<Order[]> = async () => {
	const isDev = process.env.NODE_ENV === 'development';
	const url = isDev
		? `${env.apiBaseUrl}/orders`
		: `${env.apiBaseUrl}/api/orders`;
	const response = await fetchWithTimeout(url, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch orders: ${response.status}`);
	}

	return response.json();
};

type FindOrderById = (id: string) => Promise<Order | null>;

export const findOrderById: FindOrderById = async (id) => {
	const isDev = process.env.NODE_ENV === 'development';
	const url = isDev
		? `${env.apiBaseUrl}/orders/${id}`
		: `${env.apiBaseUrl}/api/orders/${id}`;
	const response = await fetchWithTimeout(url, {
		cache: 'no-store',
	});

	if (response.status === 404) return null;
	if (!response.ok)
		throw new Error(`Failed to fetch order ${id}: ${response.status}`);

	return response.json();
};
