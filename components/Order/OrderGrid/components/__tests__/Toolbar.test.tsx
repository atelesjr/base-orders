import { render, screen } from '@testing-library/react';
import { OrdersGridToolbar } from '../Toolbar';

describe('OrdersGridToolbar', () => {
	it('renders actions and top pagination', () => {
		render(
			<OrdersGridToolbar
				isFiltersOpen
				pagination={{
					currentPage: 2,
					totalPages: 4,
					prevHref: '/?page=1&sortBy=timestamp&sortDir=desc',
					nextHref: '/?page=3&sortBy=timestamp&sortDir=desc',
				}}
			/>,
		);

		expect(screen.getByRole('button', { name: 'Criar ordem' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Filtro' })).toHaveAttribute(
			'aria-pressed',
			'true',
		);
		expect(screen.getByRole('navigation', { name: 'Paginação da tabela' })).toBeInTheDocument();
		expect(screen.getByText('2 de 4')).toBeInTheDocument();
	});
});
