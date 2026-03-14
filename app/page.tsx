import Image from 'next/image';

export default function Home() {
	return (
		<div className="">
			<main className="">
				<Image
					src="/assets/base-logo.avif"
					alt="Base Logo"
					width={200}
					height={200}
				/>
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
