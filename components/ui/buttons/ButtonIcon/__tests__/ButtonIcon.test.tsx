import { fireEvent, render, screen } from '@testing-library/react';
import ButtonIcon from '../index';

describe('ButtonIcon', () => {
	it('renders icon button with label', () => {
		render(
			<ButtonIcon
				iconAlt="Criar ordem"
				iconSrc="/assets/add_box_60dp.svg"
				label="Criar ordem"
			/>,
		);

		const button = screen.getByRole('button', { name: 'Criar ordem' });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('ui-button-icon--md');
		expect(button).toHaveClass('ui-button-icon--with-label');
	});

	it('renders icon-only button with aria-label and handles click', () => {
		const onClick = jest.fn();

		render(
			<ButtonIcon
				aria-label="Filtrar"
				iconAlt="Filtrar"
				iconSrc="/assets/filter_list_60dp.svg"
				onClick={onClick}
				size="sm"
			/>,
		);

		const button = screen.getByRole('button', { name: 'Filtrar' });
		expect(button).toHaveClass('ui-button-icon--sm');
		expect(button).toHaveClass('ui-button-icon--icon-only');

		fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
