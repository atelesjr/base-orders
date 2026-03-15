import {
	resolveOrdersSortBy,
	resolveOrdersSortDir,
} from '@/lib/orders/orders.sort';
import type {
	OrdersSortBy,
	OrdersSortDir,
} from '@/lib/orders/orders.sort.types';

export type OrderGridQueryParams = {
	page?: string;
	sortBy?: string;
	sortDir?: string;
};

export type ResolvedOrderGridQuery = {
	requestedPage: number;
	sortBy: OrdersSortBy;
	sortDir: OrdersSortDir;
};

export const resolveOrderGridQuery = (
	query: OrderGridQueryParams,
): ResolvedOrderGridQuery => {
	const parsedPage = Number(query.page);
	const requestedPage =
		Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
	return {
		requestedPage,
		sortBy: resolveOrdersSortBy(query.sortBy),
		sortDir: resolveOrdersSortDir(query.sortDir),
	};
};
