import type { OrdersGridBodyProps } from '../types';

export const OrdersGridBody = ({
	orders,
	columns,
	onRowClick,
}: OrdersGridBodyProps) => (
	<tbody>
		{orders.map((order) => (
			<tr
				className={`orders-grid__row${onRowClick ? ' orders-grid__row--clickable' : ''}`}
				key={order.id}
				onClick={onRowClick ? () => onRowClick(order) : undefined}
				onKeyDown={
					onRowClick
						? (event) => {
							if (event.key === 'Enter' || event.key === ' ') {
								event.preventDefault();
								onRowClick(order);
							}
						}
						: undefined
				}
				role={onRowClick ? 'button' : undefined}
				tabIndex={onRowClick ? 0 : undefined}
			>
				{columns.map((column) => (
					<td className="orders-grid__td" key={`${order.id}-${column.key}`}>
						{column.render(order)}
					</td>
				))}
			</tr>
		))}
	</tbody>
);
