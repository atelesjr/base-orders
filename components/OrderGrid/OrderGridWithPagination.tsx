import { getPaginatedOrdersForGrid } from '@/lib/orders/orders.service';
import OrderGridWithPaginationClient from './OrderGridWithPaginationClient';

type OrderGridWithPaginationProps = {
	searchParams: Promise<{
		page?: string;
	}>;
	pageSize?: number;
};

const OrderGridWithPagination = async ({
	searchParams,
	pageSize = 15,
}: OrderGridWithPaginationProps) => {
	const resolvedSearchParams = await searchParams;
	const parsedPage = Number.parseInt(resolvedSearchParams.page ?? '1', 10);
	const requestedPage = Number.isNaN(parsedPage)
		? 1
		: Math.max(1, parsedPage);

	const { items, currentPage, totalPages, prevPage, nextPage } =
		await getPaginatedOrdersForGrid(requestedPage, pageSize);

	const pagination = {
		currentPage,
		totalPages,
		prevHref: prevPage ? `/?page=${prevPage}` : undefined,
		nextHref: nextPage ? `/?page=${nextPage}` : undefined,
	};

	return (
		<OrderGridWithPaginationClient orders={items} pagination={pagination} />
	);
};

export default OrderGridWithPagination;
