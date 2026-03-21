import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreateOrderModal from '../index';

describe('CreateOrderModal', () => {
	it('renders form and closes when cancelar is clicked', () => {
		const onOpenChange = jest.fn();

		render(<CreateOrderModal onOpenChange={onOpenChange} open />);

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText('Criar ordem')).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it('validates required fields with zod', async () => {
		render(<CreateOrderModal onOpenChange={jest.fn()} open />);

		fireEvent.change(screen.getByLabelText('Instrumento'), {
			target: { value: '' },
		});
		fireEvent.change(screen.getByLabelText('Preco'), {
			target: { value: 0 },
		});
		fireEvent.change(screen.getByLabelText('Quantidade'), {
			target: { value: 0 },
		});

		fireEvent.click(screen.getByRole('button', { name: /criar/i }));

		expect(
			await screen.findByText('Instrumento e obrigatorio'),
		).toBeInTheDocument();
		expect(
			await screen.findByText('Preco deve ser maior que zero'),
		).toBeInTheDocument();
		expect(
			await screen.findByText('Quantidade deve ser maior que zero'),
		).toBeInTheDocument();
	});

	it('submits valid data and calls onCreated', async () => {
		const onCreated = jest.fn();
		const onOpenChange = jest.fn();
		global.fetch = jest.fn().mockResolvedValue({ ok: true }) as jest.Mock;

		render(
			<CreateOrderModal
				onCreated={onCreated}
				onOpenChange={onOpenChange}
				open
			/>,
		);

		fireEvent.change(screen.getByLabelText('Instrumento'), {
			target: { value: 'petr4' },
		});
		expect(
			(screen.getByLabelText('Instrumento') as HTMLInputElement).value,
		).toBe('PETR4');
		fireEvent.change(screen.getByLabelText('Lado'), {
			target: { value: 'Compra' },
		});
		fireEvent.change(screen.getByLabelText('Preco'), {
			target: { value: '10' },
		});
		fireEvent.change(screen.getByLabelText('Quantidade'), {
			target: { value: '100' },
		});

		fireEvent.click(screen.getByRole('button', { name: /criar/i }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				'/api/orders',
				expect.objectContaining({ method: 'POST' }),
			);
			const fetchCall = (global.fetch as jest.Mock).mock.calls[0][1];
			expect(JSON.parse(fetchCall.body).instrument).toBe('PETR4');
			expect(onCreated).toHaveBeenCalled();
			expect(onOpenChange).toHaveBeenCalledWith(false);
		});
	});
});
