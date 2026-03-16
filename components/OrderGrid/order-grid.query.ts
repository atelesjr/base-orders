import {
	resolveOrdersGridFilters,
} from '@/lib/orders/orders.filter';
import type { OrdersGridFilters } from '@/lib/orders/orders.filter.types';
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
	id?: string;
	instrument?: string;
	status?: string;
	side?: string;
	date?: string;
};

export type ResolvedOrderGridQuery = {
	requestedPage: number;
	sortBy: OrdersSortBy;
	sortDir: OrdersSortDir;
	filters: OrdersGridFilters;
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
		filters: resolveOrdersGridFilters({
			id: query.id,
			instrument: query.instrument,
			status: query.status,
			side: query.side,
			date: query.date,
		}),
	};
};
