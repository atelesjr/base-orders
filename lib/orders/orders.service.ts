import type { Order } from './orders.types';
import { findAllOrders } from './orders.repository';

export const getOrdersForGrid: () => Promise<Order[]> = async () => {
	const orders = await findAllOrders();

	// Exemplo de regra de negócio: mais recentes primeiro
	return [...orders].sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
	);
};
