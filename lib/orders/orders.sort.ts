import {
	DEFAULT_ORDERS_SORT_BY,
	DEFAULT_ORDERS_SORT_DIR,
} from './orders.constants';
import type { Order } from './orders.types';
import {
	ORDERS_SORT_FIELDS,
	type OrdersSortBy,
	type OrdersSortDir,
} from './orders.sort.types';

const STATUS_RANK = {
	Cancelada: 0,
	Executada: 1,
	Parcial: 2,
	Aberta: 3,
} as const satisfies Record<Order['status'], number>;

const SIDE_RANK = {
	Compra: 0,
	Venda: 1,
} as const satisfies Record<Order['side'], number>;

const ORDERS_SORT_FIELDS_SET = new Set<string>(ORDERS_SORT_FIELDS);

export const isOrdersSortBy = (value: string): value is OrdersSortBy =>
	ORDERS_SORT_FIELDS_SET.has(value);

export const resolveOrdersSortBy = (value?: string): OrdersSortBy => {
	if (!value) {
		return DEFAULT_ORDERS_SORT_BY;
	}

	return isOrdersSortBy(value) ? value : DEFAULT_ORDERS_SORT_BY;
};

export const resolveOrdersSortDir = (value?: string): OrdersSortDir =>
	value === 'asc' || value === 'desc' ? value : DEFAULT_ORDERS_SORT_DIR;

export const getDefaultSortDirForField = (
	sortBy: OrdersSortBy,
): OrdersSortDir => (sortBy === 'timestamp' ? 'desc' : 'asc');

const compareBySortField = (
	a: Order,
	b: Order,
	sortBy: OrdersSortBy,
): number => {
	switch (sortBy) {
		case 'timestamp':
			return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
		case 'instrument':
			return a.instrument.localeCompare(b.instrument, 'pt-BR', {
				sensitivity: 'base',
			});
		case 'side':
			return SIDE_RANK[a.side] - SIDE_RANK[b.side];
		case 'price':
			return a.price - b.price;
		case 'quantity':
			return a.quantity - b.quantity;
		case 'remainingQuantity':
			return a.remainingQuantity - b.remainingQuantity;
		case 'status':
			return STATUS_RANK[a.status] - STATUS_RANK[b.status];
		default:
			return 0;
	}
};

const compareByDefaultTieBreak = (a: Order, b: Order): number => {
	const timestampCompare =
		new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();

	if (timestampCompare !== 0) {
		return timestampCompare;
	}

	return b.id.localeCompare(a.id, 'pt-BR', { numeric: true, sensitivity: 'base' });
};

export const getSortedOrders = (
	orders: Order[],
	sortBy: OrdersSortBy,
	sortDir: OrdersSortDir,
): Order[] => {
	const direction = sortDir === 'asc' ? 1 : -1;

	return [...orders].sort((a, b) => {
		const primaryCompare = compareBySortField(a, b, sortBy) * direction;

		if (primaryCompare !== 0) {
			return primaryCompare;
		}

		return compareByDefaultTieBreak(a, b);
	});
};
