import { fireEvent, render, screen } from '@testing-library/react';
import TextInput from '../index';

describe('TextInput', () => {
	it('renders with default props', () => {
		render(<TextInput aria-label="Instrumento" placeholder="Digite" />);

		const input = screen.getByRole('textbox', { name: 'Instrumento' });
		expect(input).toBeInTheDocument();
		expect(input).toHaveClass('ui-text-input__input');
	});

	it('renders optional label and error message', () => {
		render(
			<TextInput
				errorMessage="Campo obrigatório"
				invalid
				label="Instrumento"
			/>,
		);

		const input = screen.getByRole('textbox', { name: 'Instrumento' });
		expect(input).toHaveAttribute('aria-invalid', 'true');

		const error = screen.getByRole('alert');
		expect(error).toHaveTextContent('Campo obrigatório');
		expect(input).toHaveAttribute('aria-describedby', error.id);
	});

	it('calls onValueChange and native onChange', () => {
		const onValueChange = jest.fn();
		const onChange = jest.fn();

		render(
			<TextInput
				aria-label="Instrumento"
				onChange={onChange}
				onValueChange={onValueChange}
			/>,
		);

		fireEvent.change(screen.getByRole('textbox', { name: 'Instrumento' }), {
			target: { value: 'PETR4' },
		});

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onValueChange).toHaveBeenCalledWith('PETR4');
	});

	it('supports disabled and invalid states', () => {
		render(<TextInput aria-label="Instrumento" disabled invalid />);

		const input = screen.getByRole('textbox', { name: 'Instrumento' });
		expect(input).toBeDisabled();
		expect(input).toHaveClass('ui-text-input--invalid');
	});
});
