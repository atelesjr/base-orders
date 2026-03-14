import type { Order } from '@/lib/orders/orders.types';
import './OrderGrid.styles.css';

type OrdersGridProps = {
	orders: Order[];
};

const OrdersGrid = ({ orders }: OrdersGridProps) => {
	return (
		<section className="orders-grid">
			<h2 className="orders-grid__title">Ordens</h2>
			<div className="orders-grid__table-wrapper">
				<table className="orders-grid__table">
					<thead>
						<tr className="orders-grid__head-row">
							<th className="orders-grid__th">Instrumento</th>
							<th className="orders-grid__th">Lado</th>
							<th className="orders-grid__th">Preço</th>
							<th className="orders-grid__th">Qtd</th>
							<th className="orders-grid__th">Qtd Restante</th>
							<th className="orders-grid__th">Status</th>
							<th className="orders-grid__th">Data/Hora</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr className="orders-grid__row" key={order.id}>
								<td className="orders-grid__td">{order.instrument}</td>
								<td className="orders-grid__td">{order.side}</td>
								<td className="orders-grid__td">{order.price}</td>
								<td className="orders-grid__td">{order.quantity}</td>
								<td className="orders-grid__td">{order.remainingQuantity}</td>
								<td className="orders-grid__td">{order.status}</td>
								<td className="orders-grid__td">{order.timestamp}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default OrdersGrid;
