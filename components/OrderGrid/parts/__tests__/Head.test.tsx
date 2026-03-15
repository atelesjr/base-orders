import { render, screen } from '@testing-library/react';
import { OrdersGridHead } from '../Head';
import type { OrdersGridColumn } from '../../types';

describe('OrdersGridHead', () => {
	it('renders one table header per column in order', () => {
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
			{
				key: 'price',
				label: 'Preço',
				render: (order) => order.price,
			},
		];

		render(
			<table>
				<OrdersGridHead columns={columns} />
			</table>,
		);

		const headers = screen.getAllByRole('columnheader');
		expect(headers).toHaveLength(3);
		expect(headers[0]).toHaveTextContent('Instrumento');
		expect(headers[1]).toHaveTextContent('Status');
		expect(headers[2]).toHaveTextContent('Preço');
	});

	it('renders no headers when columns are empty', () => {
		render(
			<table>
				<OrdersGridHead columns={[]} />
			</table>,
		);

		expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
	});
});
