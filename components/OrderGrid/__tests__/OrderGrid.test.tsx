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

	it('renders sortable header links with active indicator', () => {
		render(
			<OrdersGrid
				orders={[makeOrder({ id: '1', instrument: 'VALE3' })]}
				sortState={{
					sortBy: 'price',
					sortDir: 'desc',
					sortLinks: {
						price: '/?page=1&sortBy=price&sortDir=asc',
					},
				}}
			/>,
		);

		const priceSortLink = screen.getByRole('link', { name: 'Ordenar por Preço' });
		expect(priceSortLink).toBeInTheDocument();
		expect(priceSortLink).toHaveTextContent('▼');
	});

	it('renders plain text headers when no sortState is provided', () => {
		render(
			<OrdersGrid orders={[makeOrder({ id: '1', instrument: 'VALE3' })]} />,
		);

		expect(screen.getByText('Instrumento')).toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /Ordenar/ })).not.toBeInTheDocument();
	});

	it('shows ascending indicator (▲) for active ascending sort column', () => {
		render(
			<OrdersGrid
				orders={[makeOrder({ id: '1' })]}
				sortState={{
					sortBy: 'price',
					sortDir: 'asc',
					sortLinks: {
						price: '/?page=1&sortBy=price&sortDir=desc',
					},
				}}
			/>,
		);

		const priceSortLink = screen.getByRole('link', { name: 'Ordenar por Preço' });
		expect(priceSortLink).toHaveTextContent('▲');
	});

	it('shows neutral indicator (↕) for inactive sortable column', () => {
		render(
			<OrdersGrid
				orders={[makeOrder({ id: '1' })]}
				sortState={{
					sortBy: 'price',
					sortDir: 'asc',
					sortLinks: {
						price: '/?page=1&sortBy=price&sortDir=desc',
						instrument: '/?page=1&sortBy=instrument&sortDir=asc',
					},
				}}
			/>,
		);

		const instrumentLink = screen.getByRole('link', { name: 'Ordenar por Instrumento' });
		expect(instrumentLink).toHaveTextContent('↕');
	});

	it('sets aria-sort descending on active descending column', () => {
		const { container } = render(
			<OrdersGrid
				orders={[makeOrder({ id: '1' })]}
				sortState={{
					sortBy: 'price',
					sortDir: 'desc',
					sortLinks: {
						price: '/?page=1&sortBy=price&sortDir=asc',
					},
				}}
			/>,
		);

		const priceHeader = container.querySelector('th[aria-sort="descending"]');
		expect(priceHeader).toBeInTheDocument();
	});

	it('sets aria-sort ascending on active ascending column', () => {
		const { container } = render(
			<OrdersGrid
				orders={[makeOrder({ id: '1' })]}
				sortState={{
					sortBy: 'instrument',
					sortDir: 'asc',
					sortLinks: {
						instrument: '/?page=1&sortBy=instrument&sortDir=desc',
					},
				}}
			/>,
		);

		const instrumentHeader = container.querySelector('th[aria-sort="ascending"]');
		expect(instrumentHeader).toBeInTheDocument();
	});

	it('sets aria-sort none on all headers when no sortState is provided', () => {
		const { container } = render(
			<OrdersGrid orders={[makeOrder({ id: '1' })]} />,
		);

		const headers = container.querySelectorAll('th');
		headers.forEach((th) => {
			expect(th).toHaveAttribute('aria-sort', 'none');
		});
	});

	it('applies active CSS class only to the active sort link', () => {
		const { container } = render(
			<OrdersGrid
				orders={[makeOrder({ id: '1' })]}
				sortState={{
					sortBy: 'price',
					sortDir: 'asc',
					sortLinks: {
						price: '/?page=1&sortBy=price&sortDir=desc',
						instrument: '/?page=1&sortBy=instrument&sortDir=asc',
					},
				}}
			/>,
		);

		const activeLink = container.querySelector('.orders-grid__sort-link--active');
		expect(activeLink).not.toBeNull();
		expect(activeLink).toHaveAttribute('aria-label', 'Ordenar por Preço');

		const allLinks = container.querySelectorAll('.orders-grid__sort-link');
		const inactiveLinks = container.querySelectorAll(
			'.orders-grid__sort-link:not(.orders-grid__sort-link--active)',
		);
		expect(inactiveLinks.length).toBe(allLinks.length - 1);
	});
});