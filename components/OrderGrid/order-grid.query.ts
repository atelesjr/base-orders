import {
	resolveOrdersSortBy,
	resolveOrdersSortDir,
	} from '@/lib/orders/orders.sort';
import type { OrdersSortBy, OrdersSortDir } from '@/lib/orders/orders.sort.types';

type OrderGridQueryParams = {
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
	const parsedPage = Number.parseInt(query.page ?? '1', 10);
	const requestedPage = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);

	return {
		requestedPage,
		sortBy: resolveOrdersSortBy(query.sortBy),
		sortDir: resolveOrdersSortDir(query.sortDir),
	};
};
