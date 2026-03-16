import { fireEvent, render, screen } from '@testing-library/react';
import { makeOrder } from '@/lib/orders/__tests__/fixtures/orders.fixture';
import OrderGridWithPaginationClient from '../OrderGridWithPaginationClient';

jest.mock('next/navigation', () => ({
	useRouter: () => ({ push: jest.fn() }),
	usePathname: () => '/',
	useSearchParams: () => new URLSearchParams(),
}));

describe('OrderGridWithPaginationClient', () => {
	it('does not reopen modal when selected order becomes stale after list updates', () => {
		const pagination = { currentPage: 1, totalPages: 1 };
		const sortState = {
			sortBy: 'timestamp' as const,
			sortDir: 'desc' as const,
			sortLinks: {
				timestamp: '/?page=1&sortBy=timestamp&sortDir=asc',
			},
		};
		const selectedOrder = makeOrder({ id: '1', instrument: 'PETR4' });
		const anotherOrder = makeOrder({ id: '2', instrument: 'VALE3' });

		const { rerender } = render(
			<OrderGridWithPaginationClient
				filters={{}}
				orders={[selectedOrder]}
				pagination={pagination}
				sortState={sortState}
			/>,
		);

		fireEvent.click(screen.getByText('PETR4'));
		expect(screen.getByRole('dialog')).toBeInTheDocument();

		rerender(
			<OrderGridWithPaginationClient
				filters={{}}
				orders={[anotherOrder]}
				pagination={pagination}
				sortState={sortState}
			/>,
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		rerender(
			<OrderGridWithPaginationClient
				filters={{}}
				orders={[selectedOrder]}
				pagination={pagination}
				sortState={sortState}
			/>,
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('toggles filters bar from toolbar action', () => {
		render(
			<OrderGridWithPaginationClient
				filters={{}}
				orders={[makeOrder({ id: '1', instrument: 'PETR4' })]}
				pagination={{ currentPage: 1, totalPages: 1 }}
				sortState={{
					sortBy: 'timestamp',
					sortDir: 'desc',
					sortLinks: { timestamp: '/?page=1&sortBy=timestamp&sortDir=asc' },
				}}
			/>,
		);

		expect(screen.queryByRole('button', { name: 'Aplicar' })).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'Filtro' }));
		expect(screen.getByRole('button', { name: 'Aplicar' })).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'Filtro' }));
		expect(screen.queryByRole('button', { name: 'Aplicar' })).not.toBeInTheDocument();
	});

	it('shows contextual empty-state message for instrument filter', () => {
		render(
			<OrderGridWithPaginationClient
				filters={{ instrument: 'READL3' }}
				orders={[]}
				pagination={{ currentPage: 1, totalPages: 1 }}
				sortState={{
					sortBy: 'timestamp',
					sortDir: 'desc',
					sortLinks: { timestamp: '/?page=1&sortBy=timestamp&sortDir=asc' },
				}}
			/>,
		);

		expect(screen.getByText('READL3 nao encontrado.')).toBeInTheDocument();
	});

	it('shows generic empty-state message when no filters are active', () => {
		render(
			<OrderGridWithPaginationClient
				filters={{}}
				orders={[]}
				pagination={{ currentPage: 1, totalPages: 1 }}
				sortState={{
					sortBy: 'timestamp',
					sortDir: 'desc',
					sortLinks: { timestamp: '/?page=1&sortBy=timestamp&sortDir=asc' },
				}}
			/>,
		);

		expect(screen.getByText('Nenhuma ordem encontrada.')).toBeInTheDocument();
	});
});
