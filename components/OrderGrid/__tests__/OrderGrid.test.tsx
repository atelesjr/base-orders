import { fireEvent, render, screen } from '@testing-library/react';
import OrdersGrid from '../index';
import { defaultColumns } from '../columns';
import type { OrdersGridColumn } from '../types';
import { makeOrder } from '@/lib/orders/__tests__/fixtures/orders.fixture';

describe('OrderGrid', () => {
	it('renders table with default columns and row data', () => {
		const orders = [makeOrder({ id: '1', instrument: 'VALE3' })];

		render(<OrdersGrid orders={orders} />);

		expect(screen.getByRole('table')).toBeInTheDocument();
		expect(screen.getByText('Instrumento')).toBeInTheDocument();
		expect(screen.getByText('Data/Hora')).toBeInTheDocument();
		expect(screen.getByText('VALE3')).toBeInTheDocument();
	});

	it('renders custom columns and applies configured widths', () => {
		const customColumns: OrdersGridColumn[] = [
			{
				key: 'instrument',
				label: 'Ticker',
				width: '30%',
				render: (order) => order.instrument,
			},
			{
				key: 'status',
				label: 'Situação',
				render: (order) => order.status,
			},
		];

		const { container } = render(
			<OrdersGrid orders={[makeOrder({ status: 'Parcial' })]} columns={customColumns} />,
		);

		expect(screen.getByText('Ticker')).toBeInTheDocument();
		expect(screen.getByText('Situação')).toBeInTheDocument();
		expect(screen.getByText('Parcial')).toBeInTheDocument();

		const cols = container.querySelectorAll('col');
		expect(cols).toHaveLength(2);
		expect(cols[0]).toHaveStyle({ width: '30%' });
		expect(cols[1]).toHaveStyle({ width: 'auto' });
	});

	it('renders no body rows when orders list is empty', () => {
		const { container } = render(<OrdersGrid orders={[]} />);

		expect(screen.getByRole('table')).toBeInTheDocument();
		expect(container.querySelectorAll('tbody tr')).toHaveLength(0);
	});

	it('calls onRowClick when a row is clicked', () => {
		const orders = [makeOrder({ id: '1', instrument: 'VALE3' })];
		const onRowClick = jest.fn();

		const { container } = render(
			<OrdersGrid onRowClick={onRowClick} orders={orders} />,
		);

		const row = container.querySelector('tbody tr');
		expect(row).toBeTruthy();

		fireEvent.click(row as Element);

		expect(onRowClick).toHaveBeenCalledTimes(1);
		expect(onRowClick).toHaveBeenCalledWith(orders[0]);
	});

	it('exposes compound members for composition', () => {
		expect(OrdersGrid.Root).toBeDefined();
		expect(OrdersGrid.Table).toBeDefined();
		expect(OrdersGrid.Head).toBeDefined();
		expect(OrdersGrid.Body).toBeDefined();
		expect(OrdersGrid.defaultColumns).toBe(defaultColumns);
	});
});
