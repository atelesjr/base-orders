import { fireEvent, render, screen } from '@testing-library/react';
import { makeOrder } from '@/lib/orders/__tests__/fixtures/orders.fixture';
import OrderDetailsModal from '../index';

describe('OrderDetailsModal', () => {
	it('does not render when order is null', () => {
		render(
			<OrderDetailsModal open onOpenChange={jest.fn()} order={null} />,
		);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('does not render modal when open is false', () => {
		const order = makeOrder();

		render(
			<OrderDetailsModal open={false} onOpenChange={jest.fn()} order={order} />,
		);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('renders order details and status history when open', () => {
		const order = makeOrder({
			id: '10',
			instrument: 'PETR4',
			side: 'Compra',
			status: 'Parcial',
			statusHistory: [
				{ status: 'Aberta', updatedAt: '2026-03-15T10:00:00Z' },
				{ status: 'Parcial', updatedAt: '2026-03-15T11:00:00Z' },
			],
		});

		render(<OrderDetailsModal open onOpenChange={jest.fn()} order={order} />);

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText('Ordem #10 - PETR4')).toBeInTheDocument();
		expect(screen.getByText('Instrumento')).toBeInTheDocument();
		expect(screen.getByText('Compra')).toBeInTheDocument();
		expect(screen.getAllByText('Parcial')).toHaveLength(2);
		expect(screen.getByText('Histórico de status')).toBeInTheDocument();
		expect(screen.getByText('Aberta')).toBeInTheDocument();
	});

	it('calls onOpenChange(false) when close button is clicked', () => {
		const onOpenChange = jest.fn();
		const order = makeOrder();

		render(
			<OrderDetailsModal open onOpenChange={onOpenChange} order={order} />,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));

		expect(onOpenChange).toHaveBeenCalledWith(false);
	});
});
