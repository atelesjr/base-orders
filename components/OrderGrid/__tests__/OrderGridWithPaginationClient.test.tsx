import { fireEvent, render, screen } from '@testing-library/react';
import { makeOrder } from '@/lib/orders/__tests__/fixtures/orders.fixture';
import OrderGridWithPaginationClient from '../OrderGridWithPaginationClient';

describe('OrderGridWithPaginationClient', () => {
	it('does not reopen modal after selection becomes stale and data changes back', () => {
		const pagination = { currentPage: 1, totalPages: 1 };
		const selectedOrder = makeOrder({ id: '1', instrument: 'PETR4' });
		const anotherOrder = makeOrder({ id: '2', instrument: 'VALE3' });

		const { rerender } = render(
			<OrderGridWithPaginationClient
				key="list-1"
				orders={[selectedOrder]}
				pagination={pagination}
			/>,
		);

		fireEvent.click(screen.getByText('PETR4'));
		expect(screen.getByRole('dialog')).toBeInTheDocument();

		rerender(
			<OrderGridWithPaginationClient
				key="list-2"
				orders={[anotherOrder]}
				pagination={pagination}
			/>,
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		rerender(
			<OrderGridWithPaginationClient
				key="list-1"
				orders={[selectedOrder]}
				pagination={pagination}
			/>,
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
