import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../index';

describe('Button', () => {
	it('renders with default props', () => {
		render(<Button>Salvar</Button>);

		const button = screen.getByRole('button', { name: 'Salvar' });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('ui-button--primary');
		expect(button).toHaveClass('ui-button--md');
		expect(button).toHaveClass('ui-button--width-auto');
	});

	it('triggers onClick when clicked', () => {
		const onClick = jest.fn();
		render(<Button onClick={onClick}>Criar</Button>);

		fireEvent.click(screen.getByRole('button', { name: 'Criar' }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('supports variant and size props', () => {
		render(
			<Button size="lg" variant="secondary">
				Cancelar
			</Button>,
		);

		const button = screen.getByRole('button', { name: 'Cancelar' });
		expect(button).toHaveClass('ui-button--secondary');
		expect(button).toHaveClass('ui-button--lg');
	});

	it('supports full width mode', () => {
		render(<Button width="full">Aplicar</Button>);

		const button = screen.getByRole('button', { name: 'Aplicar' });
		expect(button).toHaveClass('ui-button--width-full');
	});
});
