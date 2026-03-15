import OrderGridWithPagination from '@/components/OrderGrid/OrderGridWithPagination';
import Header from '@/components/Header';

type HomeProps = {
	searchParams: Promise<{
		page?: string;
	}>;
};

export default async function Home({ searchParams }: HomeProps) {
	return (
		<div className="page-container">
			<Header />
			<main className="main">
				<h1>Gerenciamento de ordens</h1>
				<OrderGridWithPagination searchParams={searchParams} />
			</main>
		</div>
	);
}
