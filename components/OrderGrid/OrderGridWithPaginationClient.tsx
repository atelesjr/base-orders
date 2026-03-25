'use client';

import { useRouter } from 'next/navigation';
import CreateOrderModal from '@/components/CreateOrderModal';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import type { Order } from '@/lib/orders/orders.types';
import OrdersGrid from './index';
import type {
	OrdersGridFilterState,
	OrdersGridPaginationData,
	OrdersGridSortState,
} from './types';
import { OrdersGridFiltersBar } from './components/Filter/FiltersBar';
import { OrdersGridPagination } from './components/Pagination';
import { OrdersGridToolbar } from './components/Toolbar';
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
	const router = useRouter();
	const {
		isFiltersOpen,
		isCreateOrderOpen,
		selectedOrder,
		emptyStateMessage,
		toggleFilters,
		openCreateOrderModal,
		handleCreateOrderOpenChange,
		handleRowClick,
		handleModalOpenChange,
	} = useOrderGridWithPaginationController({ orders, filters });

	return (
		<>
			<OrdersGridToolbar
				isFiltersOpen={isFiltersOpen}
				onCreateOrderClick={openCreateOrderModal}
				onFilterClick={toggleFilters}
				pagination={pagination}
			/>

			<CreateOrderModal
				onCreated={() => {
					router.refresh();
				}}
				onOpenChange={handleCreateOrderOpenChange}
				open={isCreateOrderOpen}
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
