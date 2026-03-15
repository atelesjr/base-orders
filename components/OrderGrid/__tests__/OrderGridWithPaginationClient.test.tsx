import { fireEvent, render, screen } from '@testing-library/react';
import { makeOrder } from '@/lib/orders/__tests__/fixtures/orders.fixture';
import OrderGridWithPaginationClient from '../OrderGridWithPaginationClient';

describe('OrderGridWithPaginationClient', () => {
	it('does not keep modal open across remounts with different list keys', () => {
		const pagination = { currentPage: 1, totalPages: 1 };
		const selectedOrder = makeOrder({ id: '1', instrument: 'PETR4' });
		const anotherOrder = makeOrder({ id: '2', instrument: 'VALE3' });

		const { rerender } = render(
			<OrderGridWithPaginationClient
				orders={[selectedOrder]}
				pagination={pagination}
			/>,
		);

		fireEvent.click(screen.getByText('PETR4'));
		expect(screen.getByRole('dialog')).toBeInTheDocument();

		rerender(
			<OrderGridWithPaginationClient
				orders={[anotherOrder]}
				pagination={pagination}
			/>,
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

		rerender(
			<OrderGridWithPaginationClient
				orders={[selectedOrder]}
				pagination={pagination}
			/>,
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
