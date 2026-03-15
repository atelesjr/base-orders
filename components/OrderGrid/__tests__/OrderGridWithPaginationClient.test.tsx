import { fireEvent, render, screen } from '@testing-library/react';
import { makeOrder } from '@/lib/orders/__tests__/fixtures/orders.fixture';
import OrderGridWithPaginationClient from '../OrderGridWithPaginationClient';

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
				orders={[selectedOrder]}
				pagination={pagination}
				sortState={sortState}
			/>,
		);

		fireEvent.click(screen.getByText('PETR4'));
		expect(screen.getByRole('dialog')).toBeInTheDocument();

		rerender(
			<OrderGridWithPaginationClient
				orders={[anotherOrder]}
				pagination={pagination}
				sortState={sortState}
			/>,
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		rerender(
			<OrderGridWithPaginationClient
				orders={[selectedOrder]}
				pagination={pagination}
				sortState={sortState}
			/>,
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
