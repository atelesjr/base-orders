import type { Order } from './orders.types';
import { findAllOrders } from './orders.repository';

type PaginatedOrdersResult = {
	items: Order[];
	currentPage: number;
	totalPages: number;
	prevPage?: number;
	nextPage?: number;
};

export const getOrdersForGrid: () => Promise<Order[]> = async () => {
	const orders = await findAllOrders();

	return [...orders].sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
	);
};

export const getPaginatedOrdersForGrid = async (
	requestedPage: number,
	pageSize = 15,
): Promise<PaginatedOrdersResult> => {
	const orders = await getOrdersForGrid();
	const safeRequestedPage = Number.isFinite(requestedPage) ? requestedPage : 1;
	const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));
	const currentPage = Math.min(Math.max(1, safeRequestedPage), totalPages);
	const startIndex = (currentPage - 1) * pageSize;
	const items = orders.slice(startIndex, startIndex + pageSize);

	return {
		items,
		currentPage,
		totalPages,
		prevPage: currentPage > 1 ? currentPage - 1 : undefined,
		nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
	};
};
