import { resolveOrdersGridFilters } from '@/lib/orders/orders.filter';
import type { OrdersGridFilters } from '@/lib/orders/orders.filter.types';
import {
	resolveOrdersSortBy,
	resolveOrdersSortDir,
} from '@/lib/orders/orders.sort';
import type {
	OrdersSortBy,
	OrdersSortDir,
} from '@/lib/orders/orders.sort.types';

export type OrderGridQueryParamValue = string | string[] | undefined;

export type OrderGridQueryParams = {
	page?: OrderGridQueryParamValue;
	sortBy?: OrderGridQueryParamValue;
	sortDir?: OrderGridQueryParamValue;
	id?: OrderGridQueryParamValue;
	instrument?: OrderGridQueryParamValue;
	status?: OrderGridQueryParamValue;
	side?: OrderGridQueryParamValue;
	date?: OrderGridQueryParamValue;
};

export type ResolvedOrderGridQuery = {
	requestedPage: number;
	sortBy: OrdersSortBy;
	sortDir: OrdersSortDir;
	filters: OrdersGridFilters;
};

const getSingleQueryValue = (
	value?: OrderGridQueryParamValue,
): string | undefined => {
	if (Array.isArray(value)) {
		return value[0];
	}

	return value;
};

export const resolveOrderGridQuery = (
	query: OrderGridQueryParams,
): ResolvedOrderGridQuery => {
	const parsedPage = Number(getSingleQueryValue(query.page));
	const sortBy = getSingleQueryValue(query.sortBy);
	const sortDir = getSingleQueryValue(query.sortDir);
	const id = getSingleQueryValue(query.id);
	const instrument = getSingleQueryValue(query.instrument);
	const status = getSingleQueryValue(query.status);
	const side = getSingleQueryValue(query.side);
	const date = getSingleQueryValue(query.date);
	const requestedPage =
		Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
	return {
		requestedPage,
		sortBy: resolveOrdersSortBy(sortBy),
		sortDir: resolveOrdersSortDir(sortDir),
		filters: resolveOrdersGridFilters({
			id,
			instrument,
			status,
			side,
			date,
		}),
	};
};
