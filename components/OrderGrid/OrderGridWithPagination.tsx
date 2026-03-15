import OrdersGrid from '@/components/OrderGrid';
import { getPaginatedOrdersForGrid } from '@/lib/orders/orders.service';
import { OrdersGridPagination } from './parts/Pagination';

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
	const requestedPage = Number(resolvedSearchParams.page ?? '1');

	const { items, currentPage, totalPages, prevPage, nextPage } =
		await getPaginatedOrdersForGrid(requestedPage, pageSize);

	const pagination = {
		currentPage,
		totalPages,
		prevHref: prevPage ? `/?page=${prevPage}` : undefined,
		nextHref: nextPage ? `/?page=${nextPage}` : undefined,
	};

	return (
		<>
			<OrdersGridPagination
				className="orders-grid__pagination--top"
				pagination={pagination}
			/>
			<OrdersGrid orders={items} />
			<OrdersGridPagination
				className="orders-grid__pagination--bottom"
				pagination={pagination}
			/>
		</>
	);
};

export default OrderGridWithPagination;
