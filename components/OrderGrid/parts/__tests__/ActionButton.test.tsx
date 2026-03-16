import { fireEvent, render, screen } from '@testing-library/react';
import { OrdersGridActionButton } from '../ActionButton';

describe('OrdersGridActionButton', () => {
	it('renders icon and label and triggers click', () => {
		const onClick = jest.fn();

		render(
			<OrdersGridActionButton
				iconAlt="Criar ordem"
				iconSrc="/assets/add_box_60dp.svg"
				label="Criar ordem"
				onClick={onClick}
			/>,
		);

		const button = screen.getByRole('button', { name: 'Criar ordem' });
		expect(button).toBeInTheDocument();
		expect(screen.getByText('Criar ordem')).toBeInTheDocument();

		fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
