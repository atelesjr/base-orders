import type { OrderSide, OrderStatus } from './orders.types';

export type OrdersGridFilters = {
	id?: string;
	instrument?: string;
	status?: OrderStatus;
	side?: OrderSide;
	date?: string;
};
