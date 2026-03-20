import OrderGridWithPagination from '@/components/OrderGrid/OrderGridWithPagination';
import type { OrderGridQueryParams } from '@/components/OrderGrid/order-grid.query';
import Header from '@/components/Header';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';

type HomeProps = {
	searchParams: Promise<OrderGridQueryParams>;
};

export default async function Home({ searchParams }: HomeProps) {
	return (
		<div className="page-container">
			<Header />
			<main className="main">
				<h2>Gerenciamento de ordens</h2>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<ButtonIcon
						iconAlt="Criar ordem"
						iconSrc="/assets/add_box_60dp.svg"
						label="Criar ordem"
					/>
					<ButtonIcon
						aria-label="Filtrar"
						iconAlt="Filtrar"
						iconSrc="/assets/filter_list_60dp.svg"
						variant="secondary"
					/>
				</div>
				<OrderGridWithPagination searchParams={searchParams} />
			</main>
		</div>
	);
}
