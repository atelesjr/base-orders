import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../index';

describe('Button', () => {
	it('renders with default props', () => {
		render(<Button>Salvar</Button>);

		const button = screen.getByRole('button', { name: 'Salvar' });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('ui-button--primary');
		expect(button).toHaveClass('ui-button--md');
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
});
