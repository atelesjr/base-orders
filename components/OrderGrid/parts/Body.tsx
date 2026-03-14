import type { OrdersGridBodyProps } from '../types';

export const OrdersGridBody = ({ orders, columns }: OrdersGridBodyProps) => (
	<tbody>
		{orders.map((order) => (
			<tr className="orders-grid__row" key={order.id}>
				{columns.map((column) => (
					<td className="orders-grid__td" key={`${order.id}-${column.key}`}>
						{column.render(order)}
					</td>
				))}
			</tr>
		))}
	</tbody>
);
