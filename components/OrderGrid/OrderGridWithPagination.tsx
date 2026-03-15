import { getPaginatedOrdersForGrid } from '@/lib/orders/orders.service';
import OrderGridWithPaginationClient from './OrderGridWithPaginationClient';
import {
	buildOrderGridHref,
	buildOrderGridSortLinks,
} from './order-grid.navigation';
import { resolveOrderGridQuery } from './order-grid.query';

type OrderGridWithPaginationProps = {
	searchParams: Promise<{
		page?: string;
		sortBy?: string;
		sortDir?: string;
	}>;
	pageSize?: number;
};

const OrderGridWithPagination = async ({
	searchParams,
	pageSize = 15,
}: OrderGridWithPaginationProps) => {
	const resolvedSearchParams = await searchParams;
	const { requestedPage, sortBy, sortDir } =
		resolveOrderGridQuery(resolvedSearchParams);

	const { items, currentPage, totalPages, prevPage, nextPage } =
		await getPaginatedOrdersForGrid(requestedPage, pageSize, sortBy, sortDir);

	const sortLinks = buildOrderGridSortLinks(sortBy, sortDir);

	const pagination = {
		currentPage,
		totalPages,
		prevHref: prevPage
			? buildOrderGridHref(prevPage, sortBy, sortDir)
			: undefined,
		nextHref: nextPage
			? buildOrderGridHref(nextPage, sortBy, sortDir)
			: undefined,
	};

	return (
		<OrderGridWithPaginationClient
			orders={items}
			pagination={pagination}
			sortState={{ sortBy, sortDir, sortLinks }}
		/>
	);
};

export default OrderGridWithPagination;
