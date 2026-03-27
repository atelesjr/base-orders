import { fireEvent, render, screen } from '@testing-library/react';
import DatePickerInput from '../index';

describe('DatePickerInput', () => {
	it('renders with default props', () => {
		render(<DatePickerInput aria-label="Data" />);

		const trigger = screen.getByRole('button', { name: 'Data' });
		expect(trigger).toBeInTheDocument();
		expect(trigger).toHaveClass('ui-date-picker-input__field');
		expect(trigger).toHaveTextContent('dd/mm/aaaa');
	});

	it('renders optional label and error message', () => {
		render(
			<DatePickerInput errorMessage="Campo obrigatório" invalid label="Data" />,
		);

		const trigger = screen.getByRole('button', { name: 'Data' });
		expect(trigger).toHaveClass('ui-date-picker-input--invalid');

		const error = screen.getByRole('alert');
		expect(error).toHaveTextContent('Campo obrigatório');
		expect(trigger).toHaveAttribute('aria-describedby', error.id);
	});

	it('calls onValueChange and onChange with selected value', () => {
		const onValueChange = jest.fn();
		const onChange = jest.fn();

		render(
			<DatePickerInput
				aria-label="Data"
				onChange={onChange}
				onValueChange={onValueChange}
			/>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Data' }));
		fireEvent.click(screen.getByRole('button', { name: 'Hoje' }));

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onValueChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		expect(onValueChange.mock.calls[0][0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});

	it('supports disabled and invalid states', () => {
		render(<DatePickerInput aria-label="Data" disabled invalid />);

		const trigger = screen.getByRole('button', { name: 'Data' });
		expect(trigger).toBeDisabled();
		expect(trigger).toHaveClass('ui-date-picker-input--invalid');
	});

	it('shows popover while open', () => {
		render(<DatePickerInput aria-label="Data" />);

		fireEvent.click(screen.getByRole('button', { name: 'Data' }));

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: 'Mês anterior' }),
		).toBeInTheDocument();
	});

	it('supports compound composition', () => {
		render(
			<DatePickerInput.Root
				label="Data"
				errorMessage="Campo obrigatório"
				invalid
			>
				<DatePickerInput.Label />
				<DatePickerInput.Trigger />
				<DatePickerInput.Popover />
				<DatePickerInput.Error />
			</DatePickerInput.Root>,
		);

		const trigger = screen.getByRole('button', { name: 'Data' });
		expect(trigger).toHaveClass('ui-date-picker-input--invalid');
		expect(screen.getByRole('alert')).toHaveTextContent('Campo obrigatório');
	});
});
