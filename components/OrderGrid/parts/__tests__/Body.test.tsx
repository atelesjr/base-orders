import { render, screen } from '@testing-library/react';
import { OrdersGridBody } from '../Body';
import type { OrdersGridColumn } from '../../types';
import { makeOrder } from '@/lib/orders/__tests__/fixtures/orders.fixture';

describe('OrdersGridBody', () => {
	it('renders one row per order and one cell per column', () => {
		const columns: OrdersGridColumn[] = [
			{
				key: 'instrument',
				label: 'Instrumento',
				render: (order) => order.instrument,
			},
			{
				key: 'status',
				label: 'Status',
				render: (order) => order.status,
			},
		];
		const orders = [
			makeOrder({ id: '1', instrument: 'PETR4', status: 'Aberta' }),
			makeOrder({ id: '2', instrument: 'VALE3', status: 'Executada' }),
		];

		const { container } = render(
			<table>
				<OrdersGridBody columns={columns} orders={orders} />
			</table>,
		);

		expect(container.querySelectorAll('tbody tr')).toHaveLength(2);
		expect(screen.getByText('PETR4')).toBeInTheDocument();
		expect(screen.getByText('VALE3')).toBeInTheDocument();
		expect(screen.getByText('Aberta')).toBeInTheDocument();
		expect(screen.getByText('Executada')).toBeInTheDocument();
		expect(container.querySelectorAll('tbody td')).toHaveLength(4);
	});

	it('renders no rows when orders are empty', () => {
		const columns: OrdersGridColumn[] = [
			{
				key: 'instrument',
				label: 'Instrumento',
				render: (order) => order.instrument,
			},
		];

		const { container } = render(
			<table>
				<OrdersGridBody columns={columns} orders={[]} />
			</table>,
		);

		expect(container.querySelectorAll('tbody tr')).toHaveLength(0);
	});
});
