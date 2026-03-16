import type { OrdersGridFilters } from '@/lib/orders/orders.filter.types';
import {
	getDefaultSortDirForField,
} from '@/lib/orders/orders.sort';
import {
	ORDERS_SORT_FIELDS,
	type OrdersSortBy,
	type OrdersSortDir,
} from '@/lib/orders/orders.sort.types';

export const buildOrderGridHref = (
	page: number,
	sortBy: OrdersSortBy,
	sortDir: OrdersSortDir,
	filters: OrdersGridFilters = {},
): string => {
	const params = new URLSearchParams();
	params.set('page', String(page));
	params.set('sortBy', sortBy);
	params.set('sortDir', sortDir);

	if (filters.id) {
		params.set('id', filters.id);
	}

	if (filters.instrument) {
		params.set('instrument', filters.instrument);
	}

	if (filters.status) {
		params.set('status', filters.status);
	}

	if (filters.side) {
		params.set('side', filters.side);
	}

	if (filters.date) {
		params.set('date', filters.date);
	}

	return `/?${params.toString()}`;
};

export const getNextSortDir = (
	currentSortBy: OrdersSortBy,
	currentSortDir: OrdersSortDir,
	targetSortBy: OrdersSortBy,
): OrdersSortDir => {
	if (currentSortBy === targetSortBy) {
		return currentSortDir === 'asc' ? 'desc' : 'asc';
	}

	return getDefaultSortDirForField(targetSortBy);
};

export const buildOrderGridSortLinks = (
	sortBy: OrdersSortBy,
	sortDir: OrdersSortDir,
	filters: OrdersGridFilters = {},
): Record<OrdersSortBy, string> => {
	return Object.fromEntries(
		ORDERS_SORT_FIELDS.map((field) => [
			field,
			buildOrderGridHref(
				1,
				field,
				getNextSortDir(sortBy, sortDir, field),
				filters,
			),
		]),
	) as Record<OrdersSortBy, string>;
};
