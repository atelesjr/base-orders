import OrderGridWithPagination from '@/components/OrderGrid/OrderGridWithPagination';
import type { OrderGridQueryParams } from '@/components/OrderGrid/order-grid.query';
import Header from '@/components/Header';

type HomeProps = {
	searchParams: Promise<OrderGridQueryParams>;
};

export default async function Home({ searchParams }: HomeProps) {
	return (
		<div className="page-container">
			<Header />
			<main className="main">
				<h2>Gerenciamento de ordens</h2>
				<OrderGridWithPagination searchParams={searchParams} />
			</main>
		</div>
	);
}
