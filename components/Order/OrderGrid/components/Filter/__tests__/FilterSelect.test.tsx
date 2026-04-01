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

		// Use a regex matcher for 'Sem opções' to handle whitespace/case issues
		// (Line 36)
		try {
			expect(screen.getByText(/Sem opções/i)).toBeInTheDocument();
		} catch (e) {
			screen.debug();
			throw e;
		}

		const hiddenInput = document.querySelector(
			'input[name="status"]',
		) as HTMLInputElement;
		expect(hiddenInput.value).toBe('');

		fireEvent.click(screen.getByRole('button', { name: 'Status' }));
		// (Line 44)
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});
});
