import { fireEvent, render, screen } from '@testing-library/react';
import RadioInput from '../index';

describe('RadioInput', () => {
	const options = [
		{ label: 'Compra', value: 'Compra' },
		{ label: 'Venda', value: 'Venda' },
	];

	it('renders with default props', () => {
		render(<RadioInput aria-label="Lado" name="side" options={options} />);

		expect(screen.getByRole('radio', { name: 'Compra' })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: 'Venda' })).toBeInTheDocument();
	});

	it('renders optional label and error message', () => {
		render(
			<RadioInput
				errorMessage="Selecione uma opção"
				invalid
				label="Lado"
				name="side"
				options={options}
			/>,
		);

		expect(screen.getByText('Lado')).toBeInTheDocument();
		expect(screen.getByRole('alert')).toHaveTextContent('Selecione uma opção');
		expect(screen.getByRole('radiogroup')).toHaveAttribute(
			'aria-invalid',
			'true',
		);
	});

	it('calls onValueChange and onChange with selected value', () => {
		const onChange = jest.fn();
		const onValueChange = jest.fn();

		render(
			<RadioInput
				name="side"
				onChange={onChange}
				onValueChange={onValueChange}
				options={options}
			/>,
		);

		fireEvent.click(screen.getByRole('radio', { name: 'Venda' }));

		expect(onChange).toHaveBeenCalledWith('Venda');
		expect(onValueChange).toHaveBeenCalledWith('Venda');
	});

	it('supports disabled and invalid states', () => {
		render(
			<RadioInput disabled invalid name="side" options={options} />,
		);

		const compraRadio = screen.getByRole('radio', { name: 'Compra' });
		expect(compraRadio).toBeDisabled();
		expect(compraRadio.closest('label')).toHaveClass('ui-radio-input__option--invalid');
	});
});
