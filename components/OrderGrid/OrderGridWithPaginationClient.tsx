'use client';

import { useMemo, useState } from 'react';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import type { Order } from '@/lib/orders/orders.types';
import OrdersGrid from './index';
import type {
	OrdersGridFilterState,
	OrdersGridPaginationData,
	OrdersGridSortState,
} from './types';
import { OrdersGridFiltersBar } from './parts/FiltersBar';
import { OrdersGridPagination } from './parts/Pagination';
import { OrdersGridToolbar } from './parts/Toolbar';

type SelectionState = {
	orderId: string;
	dataToken: symbol;
};

type OrderGridWithPaginationClientProps = {
	orders: Order[];
	filters: OrdersGridFilterState;
	pagination: OrdersGridPaginationData;
	sortState: OrdersGridSortState;
};

const OrderGridWithPaginationClient = ({
	orders,
	filters,
	pagination,
	sortState,
}: OrderGridWithPaginationClientProps) => {
	const dataToken = useMemo(() => Symbol('orders-data-token'), [orders]);
	const [selection, setSelection] = useState<SelectionState | null>(null);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	const selectedOrder = useMemo(() => {
		if (!selection || selection.dataToken !== dataToken) {
			return null;
		}

		return orders.find((order) => order.id === selection.orderId) ?? null;
	}, [orders, selection, dataToken]);

	const emptyStateMessage = useMemo(() => {
		if (filters.instrument) {
			return `${filters.instrument} nao encontrado.`;
		}

		if (filters.id) {
			return `ID ${filters.id} nao encontrado.`;
		}

		return 'Nenhuma ordem encontrada para os filtros aplicados.';
	}, [filters]);

	return (
		<>
			<OrdersGridToolbar
				isFiltersOpen={isFiltersOpen}
				onFilterClick={() => {
					setIsFiltersOpen((currentState) => !currentState);
				}}
				pagination={pagination}
			/>

			{isFiltersOpen ? (
				<OrdersGridFiltersBar
					filters={filters}
					sortState={{ sortBy: sortState.sortBy, sortDir: sortState.sortDir }}
				/>
			) : null}

			<OrdersGrid
				emptyStateMessage={emptyStateMessage}
				orders={orders}
				sortState={sortState}
				onRowClick={(order) => {
					setSelection({ orderId: order.id, dataToken });
				}}
			/>
			<OrdersGridPagination
				className="orders-grid__pagination--bottom"
				pagination={pagination}
			/>

			<OrderDetailsModal
				open={Boolean(selectedOrder)}
				onOpenChange={(nextOpen) => {
					if (!nextOpen) {
						setSelection(null);
					}
				}}
				order={selectedOrder}
			/>
		</>
	);
};

export default OrderGridWithPaginationClient;
