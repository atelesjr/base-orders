import type { OrdersGridHeadProps } from '../types';

export const OrdersGridHead = ({ columns }: OrdersGridHeadProps) => (
	<thead>
		<tr className="orders-grid__head-row">
			{columns.map((column) => (
				<th className="orders-grid__th" key={column.key}>
					{column.label}
				</th>
			))}
		</tr>
	</thead>
);
