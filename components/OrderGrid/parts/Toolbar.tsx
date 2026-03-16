import type { OrdersGridPaginationData } from '../types';
import { OrdersGridActionButton } from './ActionButton';
import { OrdersGridPagination } from './Pagination';

type OrdersGridToolbarProps = {
	pagination: OrdersGridPaginationData;
	onCreateOrderClick?: () => void;
	onFilterClick?: () => void;
};

export const OrdersGridToolbar = ({
	pagination,
	onCreateOrderClick,
	onFilterClick,
}: OrdersGridToolbarProps) => {
	return (
		<div className="orders-grid__toolbar">
			<div className="orders-grid__actions">
				<OrdersGridActionButton
					iconAlt="Criar ordem"
					iconSrc="/assets/add_box_60dp.svg"
					label="Criar ordem"
					onClick={onCreateOrderClick}
				/>
				<OrdersGridActionButton
					iconAlt="Filtrar ordens"
					iconSrc="/assets/filter_list_60dp.svg"
					label="Filtro"
					onClick={onFilterClick}
				/>
			</div>

			<OrdersGridPagination
				className="orders-grid__pagination--top"
				pagination={pagination}
			/>
		</div>
	);
};
