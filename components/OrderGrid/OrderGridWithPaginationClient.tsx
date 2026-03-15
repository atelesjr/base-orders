'use client';

import { useMemo, useState } from 'react';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import type { Order } from '@/lib/orders/orders.types';
import OrdersGrid from './index';
import type { OrdersGridPaginationData } from './types';
import { OrdersGridPagination } from './parts/Pagination';

type OrderGridWithPaginationClientProps = {
	orders: Order[];
	pagination: OrdersGridPaginationData;
};

const OrderGridWithPaginationClient = ({
	orders,
	pagination,
}: OrderGridWithPaginationClientProps) => {
	const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

	const selectedOrder = useMemo(
		() => orders.find((order) => order.id === selectedOrderId) ?? null,
		[orders, selectedOrderId],
	);

	return (
		<>
			<OrdersGridPagination
				className="orders-grid__pagination--top"
				pagination={pagination}
			/>
			<OrdersGrid orders={orders} onRowClick={(order) => setSelectedOrderId(order.id)} />
			<OrdersGridPagination
				className="orders-grid__pagination--bottom"
				pagination={pagination}
			/>

			<OrderDetailsModal
				open={Boolean(selectedOrder)}
				onOpenChange={(nextOpen) => {
					if (!nextOpen) {
						setSelectedOrderId(null);
					}
				}}
				order={selectedOrder}
			/>
		</>
	);
};

export default OrderGridWithPaginationClient;
