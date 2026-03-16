'use client';

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
import { useOrderGridWithPaginationController } from './useOrderGridWithPaginationController';

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
	const {
		isFiltersOpen,
		selectedOrder,
		emptyStateMessage,
		toggleFilters,
		handleRowClick,
		handleModalOpenChange,
	} = useOrderGridWithPaginationController({ orders, filters });

	return (
		<>
			<OrdersGridToolbar
				isFiltersOpen={isFiltersOpen}
				onFilterClick={toggleFilters}
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
				onRowClick={handleRowClick}
			/>
			<OrdersGridPagination
				className="orders-grid__pagination--bottom"
				pagination={pagination}
			/>

			<OrderDetailsModal
				open={Boolean(selectedOrder)}
				onOpenChange={handleModalOpenChange}
				order={selectedOrder}
			/>
		</>
	);
};

export default OrderGridWithPaginationClient;
