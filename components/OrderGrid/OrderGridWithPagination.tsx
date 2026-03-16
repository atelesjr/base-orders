import OrderGridWithPaginationClient from './OrderGridWithPaginationClient';
import {
	buildOrderGridWithPaginationViewModel,
} from './order-grid-with-pagination.presenter';
import { type OrderGridQueryParams } from './order-grid.query';

type OrderGridWithPaginationProps = {
	searchParams: Promise<OrderGridQueryParams>;
	pageSize?: number;
};

const OrderGridWithPagination = async ({
	searchParams,
	pageSize = 15,
}: OrderGridWithPaginationProps) => {
	const viewModel = await buildOrderGridWithPaginationViewModel({
		searchParams: await searchParams,
		pageSize,
	});

	return (
		<OrderGridWithPaginationClient
			orders={viewModel.orders}
			filters={viewModel.filters}
			pagination={viewModel.pagination}
			sortState={viewModel.sortState}
		/>
	);
};

export default OrderGridWithPagination;
