'use client';

import { useMemo, useState } from 'react';
import type { Order } from '@/lib/orders/orders.types';
import type { OrdersGridFilterState } from './types';
import { getOrderGridEmptyStateMessage } from './order-grid-empty-state';

type SelectionState = {
	orderId: string;
	dataToken: symbol;
};

type UseOrderGridWithPaginationControllerArgs = {
	orders: Order[];
	filters: OrdersGridFilterState;
};

export const useOrderGridWithPaginationController = ({
	orders,
	filters,
}: UseOrderGridWithPaginationControllerArgs) => {
	const dataToken = useMemo(
		() => Symbol(`orders-data-token-${orders.length}`),
		[orders],
	);

	const [selection, setSelection] = useState<SelectionState | null>(null);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);

	const selectedOrder = useMemo(() => {
		if (!selection || selection.dataToken !== dataToken) {
			return null;
		}

		return orders.find((order) => order.id === selection.orderId) ?? null;
	}, [orders, selection, dataToken]);

	const emptyStateMessage = useMemo(
		() => getOrderGridEmptyStateMessage(filters),
		[filters],
	);

	return {
		isFiltersOpen,
		isCreateOrderOpen,
		selectedOrder,
		emptyStateMessage,
		toggleFilters: () => {
			setIsFiltersOpen((currentState) => !currentState);
		},
		openCreateOrderModal: () => {
			setIsCreateOrderOpen(true);
		},
		handleCreateOrderOpenChange: (nextOpen: boolean) => {
			setIsCreateOrderOpen(nextOpen);
		},
		handleRowClick: (order: Order) => {
			setSelection({
				orderId: order.id,
				dataToken,
			});
		},
		handleModalOpenChange: (nextOpen: boolean) => {
			if (!nextOpen) {
				setSelection(null);
			}
		},
	};
};
