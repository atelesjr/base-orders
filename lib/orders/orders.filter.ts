import type { OrdersGridFilters } from './orders.filter.types';
import type { Order, OrderSide, OrderStatus } from './orders.types';

const ORDER_STATUSES: OrderStatus[] = [
	'Aberta',
	'Parcial',
	'Executada',
	'Cancelada',
];
const ORDER_SIDES: OrderSide[] = ['Compra', 'Venda'];
const DATE_FILTER_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const formatDateKey = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const normalizeTextFilter = (value?: string): string | undefined => {
	if (!value) {
		return undefined;
	}

	const normalized = value.trim();
	return normalized.length > 0 ? normalized : undefined;
};

const normalizeDateFilter = (value?: string): string | undefined => {
	const normalized = normalizeTextFilter(value);
	if (!normalized || !DATE_FILTER_PATTERN.test(normalized)) {
		return undefined;
	}

	const [year, month, day] = normalized.split('-').map(Number);
	const parsedDate = new Date(year, month - 1, day);

	if (
		Number.isNaN(parsedDate.getTime()) ||
		parsedDate.getFullYear() !== year ||
		parsedDate.getMonth() !== month - 1 ||
		parsedDate.getDate() !== day
	) {
		return undefined;
	}

	return normalized;
};

const normalizeStatusFilter = (value?: string): OrderStatus | undefined => {
	const normalized = normalizeTextFilter(value);
	if (!normalized) {
		return undefined;
	}

	return ORDER_STATUSES.find((status) => status === normalized);
};

const normalizeSideFilter = (value?: string): OrderSide | undefined => {
	const normalized = normalizeTextFilter(value);
	if (!normalized) {
		return undefined;
	}

	return ORDER_SIDES.find((side) => side === normalized);
};

const getTimestampDateKey = (timestamp: string): string | null => {
	const parsedDate = new Date(timestamp);
	if (Number.isNaN(parsedDate.getTime())) {
		return null;
	}

	return formatDateKey(parsedDate);
};

export const resolveOrdersGridFilters = (
	filters: Partial<Record<keyof OrdersGridFilters, string | undefined>>,
): OrdersGridFilters => {
	return {
		id: normalizeTextFilter(filters.id),
		instrument: normalizeTextFilter(filters.instrument),
		status: normalizeStatusFilter(filters.status),
		side: normalizeSideFilter(filters.side),
		date: normalizeDateFilter(filters.date),
	};
};

export const filterOrders = (
	orders: Order[],
	filters: OrdersGridFilters,
): Order[] => {
	const normalizedFilters = resolveOrdersGridFilters(filters);

	return orders.filter((order) => {
		if (
			normalizedFilters.id &&
			!order.id.toLowerCase().includes(normalizedFilters.id.toLowerCase())
		) {
			return false;
		}

		if (
			normalizedFilters.instrument &&
			!order.instrument
				.toLowerCase()
				.includes(normalizedFilters.instrument.toLowerCase())
		) {
			return false;
		}

		if (normalizedFilters.status && order.status !== normalizedFilters.status) {
			return false;
		}

		if (normalizedFilters.side && order.side !== normalizedFilters.side) {
			return false;
		}

		if (normalizedFilters.date) {
			const orderDateKey = getTimestampDateKey(order.timestamp);
			if (orderDateKey !== normalizedFilters.date) {
				return false;
			}
		}

		return true;
	});
};
