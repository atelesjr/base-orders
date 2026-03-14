import { ordersService } from '@/services/orders.service';
import Header from '@/components/Header';

export default async function Home() {
	// Fetch orders from json-server
	const orders = await ordersService.getOrders();

	// Log orders to console
	console.log('Orders from db.json:', orders);
	console.log('Total orders:', orders.length);

	return (
		<div className="page-container">
			<Header />
			<main className="main">
				<h1>Sobre nós</h1>
				<h2>Sobre nós</h2>
				<h3>Sobre nós</h3>
				<h4>Sobre nós</h4>
				<p>
					A Base Finanças, atua desde 2017 criando soluções para uma melhor
					gestão financeira de pequenas e médias empresas. Somos especialistas
					em negócios da economia real como indústrias, varejo e prestadoras de
					serviços, trazendo mais segurança e clareza para as tomadas de decisão
					mais importantes.
				</p>
				<p>
					A Base Finanças, atua desde 2017 criando soluções para uma melhor
					gestão financeira de pequenas e médias empresas. Somos especialistas
					em negócios da economia real como indústrias, varejo e prestadoras de
					serviços, trazendo mais segurança e clareza para as tomadas de decisão
					mais importantes.
				</p>
			</main>
		</div>
	);
}
