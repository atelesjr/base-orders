'use client';

import { useMemo, useState } from 'react';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import type { Order } from '@/lib/orders/orders.types';
import OrdersGrid from './index';
import type { OrdersGridPaginationData } from './types';
import { OrdersGridPagination } from './parts/Pagination';

type SelectionState = {
	orderId: string;
	dataToken: symbol;
};

type OrderGridWithPaginationClientProps = {
	orders: Order[];
	pagination: OrdersGridPaginationData;
};

const OrderGridWithPaginationClient = ({
	orders,
	pagination,
}: OrderGridWithPaginationClientProps) => {
	const dataToken = useMemo(() => Symbol('orders-data-token'), [orders]);
	const [selection, setSelection] = useState<SelectionState | null>(null);

	const selectedOrder = useMemo(
		() => {
			if (!selection || selection.dataToken !== dataToken) {
				return null;
			}

			return orders.find((order) => order.id === selection.orderId) ?? null;
		},
		[orders, selection, dataToken],
	);

	return (
		<>
			<OrdersGridPagination
				className="orders-grid__pagination--top"
				pagination={pagination}
			/>
			<OrdersGrid
				orders={orders}
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
