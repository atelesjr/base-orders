import type { OrdersGridFilters } from '@/lib/orders/orders.filter.types';
import type { Order } from '@/lib/orders/orders.types';
import type { OrdersSortBy, OrdersSortDir } from '@/lib/orders/orders.sort.types';
import type { ReactNode } from 'react';

export type OrdersGridColumn = {
	key: string;
	label: string;
	width?: string;
	sortKey?: OrdersSortBy;
	render: (order: Order) => ReactNode;
};

export type OrdersGridSortState = {
	sortBy: OrdersSortBy;
	sortDir: OrdersSortDir;
	sortLinks: Partial<Record<OrdersSortBy, string>>;
};

export type OrdersGridProps = {
	orders: Order[];
	columns?: OrdersGridColumn[];
	onRowClick?: (order: Order) => void;
	sortState?: OrdersGridSortState;
	emptyStateMessage?: string;
};

export type OrdersGridPaginationData = {
	currentPage: number;
	totalPages: number;
	prevHref?: string;
	nextHref?: string;
};

export type OrdersGridFilterState = OrdersGridFilters;

export type OrdersGridRootProps = {
	children: ReactNode;
};

export type OrdersGridTableProps = {
	children: ReactNode;
};

export type OrdersGridHeadProps = {
	columns: OrdersGridColumn[];
	sortState?: OrdersGridSortState;
};

export type OrdersGridBodyProps = {
	orders: Order[];
	columns: OrdersGridColumn[];
	onRowClick?: (order: Order) => void;
	emptyStateMessage?: string;
};

export type OrdersGridPaginationProps = {
	pagination: OrdersGridPaginationData;
	className?: string;
};
