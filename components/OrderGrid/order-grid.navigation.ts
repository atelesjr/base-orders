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
): string => {
	const params = new URLSearchParams();
	params.set('page', String(page));
	params.set('sortBy', sortBy);
	params.set('sortDir', sortDir);
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
): Record<OrdersSortBy, string> => {
	return Object.fromEntries(
		ORDERS_SORT_FIELDS.map((field) => [
			field,
			buildOrderGridHref(1, field, getNextSortDir(sortBy, sortDir, field)),
		]),
	) as Record<OrdersSortBy, string>;
};
