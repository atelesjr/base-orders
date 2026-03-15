import { fireEvent, render, screen } from '@testing-library/react';
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

	it('supports keyboard activation when row is clickable', () => {
		const columns: OrdersGridColumn[] = [
			{
				key: 'instrument',
				label: 'Instrumento',
				render: (order) => order.instrument,
			},
		];
		const order = makeOrder({ id: '1', instrument: 'PETR4' });
		const onRowClick = jest.fn();

		render(
			<table>
				<OrdersGridBody
					columns={columns}
					onRowClick={onRowClick}
					orders={[order]}
				/>
			</table>,
		);

		const row = screen.getByRole('row');
		expect(row).toHaveAttribute('tabindex', '0');
		expect(row).not.toHaveAttribute('role', 'button');

		fireEvent.keyDown(row, { key: 'Enter' });
		fireEvent.keyDown(row, { key: ' ' });

		expect(onRowClick).toHaveBeenCalledTimes(2);
		expect(onRowClick).toHaveBeenNthCalledWith(1, order);
		expect(onRowClick).toHaveBeenNthCalledWith(2, order);
	});
});
