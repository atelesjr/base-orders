import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
	title: 'Base Orders',
	description:
		'A Base Orders é uma plataforma de gestão de pedidos e vendas para pequenas e médias empresas, oferecendo uma solução completa para otimizar o processo de vendas, desde a criação do pedido até a entrega ao cliente. Com recursos avançados de gerenciamento de estoque, integração com sistemas de pagamento e relatórios detalhados, a Base Orders ajuda as empresas a aumentar a eficiência operacional e melhorar a experiência do cliente.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
