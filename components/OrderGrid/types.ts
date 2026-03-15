import type { Order } from '@/lib/orders/orders.types';
import type { ReactNode } from 'react';

export type OrdersGridColumn = {
	key: string;
	label: string;
	width?: string;
	render: (order: Order) => ReactNode;
};

export type OrdersGridProps = {
	orders: Order[];
	columns?: OrdersGridColumn[];
};

export type OrdersGridRootProps = {
	children: ReactNode;
};

export type OrdersGridTableProps = {
	children: ReactNode;
};

export type OrdersGridHeadProps = {
	columns: OrdersGridColumn[];
};

export type OrdersGridBodyProps = {
	orders: Order[];
	columns: OrdersGridColumn[];
};
