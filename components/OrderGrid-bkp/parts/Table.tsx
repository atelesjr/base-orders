import type { OrdersGridTableProps } from '../types';

export const OrdersGridTable = ({ children }: OrdersGridTableProps) => (
	<div className="orders-grid__table-wrapper">
		<table className="orders-grid__table">{children}</table>
	</div>
);
