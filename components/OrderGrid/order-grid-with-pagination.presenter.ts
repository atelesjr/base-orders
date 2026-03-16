import { getPaginatedOrdersForGrid } from '@/lib/orders/orders.service';
import type { Order } from '@/lib/orders/orders.types';
import type { OrdersGridFilterState, OrdersGridPaginationData, OrdersGridSortState } from './types';
import { buildOrderGridHref, buildOrderGridSortLinks } from './order-grid.navigation';
import { resolveOrderGridQuery, type OrderGridQueryParams } from './order-grid.query';

export type OrderGridWithPaginationViewModel = {
	orders: Order[];
	filters: OrdersGridFilterState;
	pagination: OrdersGridPaginationData;
	sortState: OrdersGridSortState;
};

type BuildOrderGridWithPaginationViewModelArgs = {
	searchParams: OrderGridQueryParams;
	pageSize: number;
};

export const buildOrderGridWithPaginationViewModel = async ({
	searchParams,
	pageSize,
}: BuildOrderGridWithPaginationViewModelArgs): Promise<OrderGridWithPaginationViewModel> => {
	const { requestedPage, sortBy, sortDir, filters } =
		resolveOrderGridQuery(searchParams);

	const { items, currentPage, totalPages, prevPage, nextPage } =
		await getPaginatedOrdersForGrid(
			requestedPage,
			pageSize,
			sortBy,
			sortDir,
			filters,
		);

	const sortLinks = buildOrderGridSortLinks(sortBy, sortDir, filters);

	const pagination: OrdersGridPaginationData = {
		currentPage,
		totalPages,
		prevHref: prevPage
			? buildOrderGridHref(prevPage, sortBy, sortDir, filters)
			: undefined,
		nextHref: nextPage
			? buildOrderGridHref(nextPage, sortBy, sortDir, filters)
			: undefined,
	};

	return {
		orders: items,
		filters,
		pagination,
		sortState: { sortBy, sortDir, sortLinks },
	};
};
