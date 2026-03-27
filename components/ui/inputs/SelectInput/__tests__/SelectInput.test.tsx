import { fireEvent, render, screen } from '@testing-library/react';
import SelectInput from '../index';

const options = [
	{ label: 'Todos', value: '' },
	{ label: 'Compra', value: 'Compra' },
	{ label: 'Venda', value: 'Venda' },
];

describe('SelectInput', () => {
	it('renders with default props', () => {
		render(<SelectInput aria-label="Lado" options={options} />);

		const select = screen.getByRole('combobox', { name: 'Lado' });
		expect(select).toBeInTheDocument();
		expect(select).toHaveClass('ui-select-input__field');
	});

	it('renders optional label and error message', () => {
		render(
			<SelectInput
				errorMessage="Campo obrigatorio"
				invalid
				label="Lado"
				options={options}
			/>,
		);

		const select = screen.getByRole('combobox', { name: 'Lado' });
		expect(select).toHaveAttribute('aria-invalid', 'true');

		const error = screen.getByRole('alert');
		expect(error).toHaveTextContent('Campo obrigatorio');
		expect(select).toHaveAttribute('aria-describedby', error.id);
	});

	it('calls onValueChange and onChange with selected value', () => {
		const onValueChange = jest.fn();
		const onChange = jest.fn();

		render(
			<SelectInput
				aria-label="Lado"
				onChange={onChange}
				onValueChange={onValueChange}
				options={options}
			/>,
		);

		fireEvent.click(screen.getByRole('combobox', { name: 'Lado' }));
		fireEvent.click(screen.getByRole('option', { name: 'Compra' }));

		expect(onChange).toHaveBeenCalledWith('Compra');
		expect(onValueChange).toHaveBeenCalledWith('Compra');
	});

	it('supports disabled and invalid states', () => {
		render(<SelectInput aria-label="Lado" disabled invalid options={options} />);

		const select = screen.getByRole('combobox', { name: 'Lado' });
		expect(select).toBeDisabled();
		expect(select).toHaveClass('ui-select-input--invalid');
	});

	it('shows green-selected class for active option in list', () => {
		render(<SelectInput aria-label="Lado" options={options} value="Compra" />);

		fireEvent.click(screen.getByRole('combobox', { name: 'Lado' }));

		expect(screen.getByRole('option', { name: 'Compra' })).toHaveClass(
			'ui-select-input__option--selected',
		);
	});

	it('supports compound composition', () => {
		render(
			<SelectInput.Root
				label="Lado"
				errorMessage="Campo obrigatorio"
				invalid
				options={options}
			>
				<SelectInput.Label />
				<SelectInput.Trigger />
				<SelectInput.Menu />
				<SelectInput.Error />
			</SelectInput.Root>,
		);

		const trigger = screen.getByRole('combobox', { name: 'Lado' });
		expect(trigger).toHaveAttribute('aria-invalid', 'true');
		expect(screen.getByRole('alert')).toHaveTextContent('Campo obrigatorio');
	});
});
