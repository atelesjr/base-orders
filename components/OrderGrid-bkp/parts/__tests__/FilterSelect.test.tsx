import { fireEvent, render, screen } from '@testing-library/react';
import { OrdersGridFilterSelect } from '../FilterSelect';

describe('OrdersGridFilterSelect', () => {
	it('falls back to first option when provided value is invalid and keeps hidden input aligned', () => {
		render(
			<OrdersGridFilterSelect
				ariaLabel="Status"
				id="status"
				name="status"
				onChange={jest.fn()}
				options={[
					{ label: 'Todos', value: '' },
					{ label: 'Aberta', value: 'Aberta' },
				]}
				value="Invalido"
			/>,
		);

		expect(screen.getByText('Todos')).toBeInTheDocument();
		const hiddenInput = document.querySelector(
			'input[name="status"]',
		) as HTMLInputElement;
		expect(hiddenInput.value).toBe('');
	});

	it('renders safe empty state when options are empty', () => {
		render(
			<OrdersGridFilterSelect
				ariaLabel="Status"
				id="status"
				name="status"
				onChange={jest.fn()}
				options={[]}
				value="Aberta"
			/>,
		);

		expect(screen.getByText('Sem opcoes')).toBeInTheDocument();
		const hiddenInput = document.querySelector(
			'input[name="status"]',
		) as HTMLInputElement;
		expect(hiddenInput.value).toBe('');

		fireEvent.click(screen.getByRole('button', { name: 'Status' }));
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});
});
