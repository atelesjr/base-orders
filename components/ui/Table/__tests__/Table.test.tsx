import { fireEvent, render, screen } from '@testing-library/react';
import Table, { type TableColumn } from '../index';

type TableRow = {
	id: string;
	instrument: string;
	type: 'Compra' | 'Venda';
};

const columns: TableColumn<TableRow>[] = [
	{ key: 'instrument', label: 'Instrumento', render: (row) => row.instrument },
	{ key: 'type', label: 'Tipo', render: (row) => row.type },
];

const data: TableRow[] = [
	{ id: '1', instrument: 'PETR4', type: 'Compra' },
	{ id: '2', instrument: 'VALE3', type: 'Venda' },
];

describe('Table', () => {
	it('renders with default props', () => {
		render(<Table caption="Ordens" columns={columns} data={data} />);

		expect(screen.getByRole('table', { name: 'Ordens' })).toBeInTheDocument();
		expect(screen.getByRole('columnheader', { name: 'Instrumento' })).toBeInTheDocument();
		expect(screen.getByRole('columnheader', { name: 'Tipo' })).toBeInTheDocument();
		expect(screen.getByText('PETR4')).toBeInTheDocument();
		expect(screen.getByText('VALE3')).toBeInTheDocument();
	});

	it('uses semantic table a11y attributes', () => {
		render(<Table caption="Ordens" columns={columns} data={data} />);

		const headers = screen.getAllByRole('columnheader');
		headers.forEach((header) => {
			expect(header).toHaveAttribute('scope', 'col');
		});
	});

	it('triggers onRowClick on mouse and keyboard', () => {
		const onRowClick = jest.fn();
		render(
			<Table
				caption="Ordens"
				columns={columns}
				data={data}
				onRowClick={onRowClick}
			/>,
		);

		const firstRowCell = screen.getByText('PETR4');
		const firstRow = firstRowCell.closest('tr');
		expect(firstRow).toBeTruthy();

		fireEvent.click(firstRow as Element);
		fireEvent.keyDown(firstRow as Element, { key: 'Enter' });

		expect(onRowClick).toHaveBeenCalledTimes(2);
		expect(onRowClick).toHaveBeenNthCalledWith(1, data[0]);
		expect(onRowClick).toHaveBeenNthCalledWith(2, data[0]);
	});

	it('renders empty state message when there is no data', () => {
		render(
			<Table
				caption="Ordens"
				columns={columns}
				data={[]}
				emptyStateMessage="Sem ordens"
			/>,
		);

		expect(screen.getByText('Sem ordens')).toBeInTheDocument();
	});
});
