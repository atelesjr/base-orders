import OrdersGrid from '@/components/OrderGrid';
import { getOrdersForGrid } from '@/lib/orders/orders.service';
import Header from '@/components/Header';

export default async function Home() {
	// Fetch orders from json-server
	const orders = await getOrdersForGrid();

	return (
		<div className="page-container">
			<Header />
			<main className="main">
				<h1>Gerenciamento de ordens</h1>
				<OrdersGrid orders={orders} />
			</main>
		</div>
	);
}
