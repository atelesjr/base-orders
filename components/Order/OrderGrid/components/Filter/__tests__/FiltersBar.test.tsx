import { fireEvent, render, screen } from '@testing-library/react';
import { OrdersGridFiltersBar } from '../FiltersBar';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
	useRouter: () => ({ push: pushMock }),
	usePathname: () => '/',
	useSearchParams: () =>
		new URLSearchParams('page=2&sortBy=timestamp&sortDir=desc&side=Compra'),
}));

describe('OrdersGridFiltersBar', () => {
	beforeEach(() => {
		pushMock.mockClear();
	});

	it('applies side filter when selecting Venda', () => {
		const { container } = render(
			<OrdersGridFiltersBar
				filters={{ side: 'Compra' }}
				sortState={{ sortBy: 'timestamp', sortDir: 'desc' }}
			/>,
		);

		fireEvent.click(screen.getByRole('combobox', { name: 'Lado' }));
		fireEvent.click(screen.getByRole('option', { name: 'Venda' }));

		const sideInput = container.querySelector(
			'input[name="side"]',
		) as HTMLInputElement;
		expect(sideInput.value).toBe('Venda');

		fireEvent.click(screen.getByRole('button', { name: 'Aplicar' }));

		expect(pushMock).toHaveBeenCalledWith(
			'/?page=1&sortBy=timestamp&sortDir=desc&side=Venda',
		);
	});

	it('clears active filters and navigates to first page preserving sort', () => {
		const { container } = render(
			<OrdersGridFiltersBar
				filters={{ side: 'Compra' }}
				sortState={{ sortBy: 'timestamp', sortDir: 'desc' }}
			/>,
		);

		const sideInput = container.querySelector(
			'input[name="side"]',
		) as HTMLInputElement;
		expect(sideInput.value).toBe('Compra');

		fireEvent.click(screen.getByRole('button', { name: 'Limpar' }));

		expect(sideInput.value).toBe('');
		expect(pushMock).toHaveBeenCalledWith(
			'/?page=1&sortBy=timestamp&sortDir=desc',
		);
	});
});
