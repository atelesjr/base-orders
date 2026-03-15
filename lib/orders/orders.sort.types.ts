export const ORDERS_SORT_FIELDS = [
	'timestamp',
	'instrument',
	'side',
	'price',
	'quantity',
	'remainingQuantity',
	'status',
] as const;

export type OrdersSortBy = (typeof ORDERS_SORT_FIELDS)[number];
export type OrdersSortDir = 'asc' | 'desc';
