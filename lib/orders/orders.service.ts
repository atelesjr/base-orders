import {
	DEFAULT_ORDERS_SORT_BY,
	DEFAULT_ORDERS_SORT_DIR,
	DEFAULT_PAGE_SIZE,
} from './orders.constants';
import { findAllOrders } from './orders.repository';
import { getSortedOrders } from './orders.sort';
import type { OrdersSortBy, OrdersSortDir } from './orders.sort.types';
import type { Order } from './orders.types';

type PaginatedOrdersResult = {
	items: Order[];
	currentPage: number;
	totalPages: number;
	prevPage?: number;
	nextPage?: number;
};

export const getOrdersForGrid: () => Promise<Order[]> = async () => {
	const orders = await findAllOrders();

	return getSortedOrders(
		orders,
		DEFAULT_ORDERS_SORT_BY,
		DEFAULT_ORDERS_SORT_DIR,
	);
};

export const getPaginatedOrdersForGrid = async (
	requestedPage: number,
	pageSize = DEFAULT_PAGE_SIZE,
	sortBy: OrdersSortBy = DEFAULT_ORDERS_SORT_BY,
	sortDir: OrdersSortDir = DEFAULT_ORDERS_SORT_DIR,
): Promise<PaginatedOrdersResult> => {
	const orders = getSortedOrders(await findAllOrders(), sortBy, sortDir);
	const normalizedPageSize =
		Number.isFinite(pageSize) && pageSize > 0
			? Math.floor(pageSize)
			: DEFAULT_PAGE_SIZE;
	const safeRequestedPage =
		Number.isFinite(requestedPage) && requestedPage > 0
			? Math.floor(requestedPage)
			: 1;
	const totalPages = Math.max(1, Math.ceil(orders.length / normalizedPageSize));
	const currentPage = Math.min(Math.max(1, safeRequestedPage), totalPages);
	const startIndex = (currentPage - 1) * normalizedPageSize;
	const items = orders.slice(startIndex, startIndex + normalizedPageSize);

	return {
		items,
		currentPage,
		totalPages,
		prevPage: currentPage > 1 ? currentPage - 1 : undefined,
		nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
	};
};
