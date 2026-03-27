import type { Meta, StoryObj } from '@storybook/nextjs';
import Table, { type TableColumn, type TableProps } from './index';

type OrderRow = {
	id: string;
	instrument: string;
	type: 'Compra' | 'Venda';
	quantity: number;
	price: number;
};

const columns: TableColumn<OrderRow>[] = [
	{ key: 'instrument', label: 'Instrumento', render: (row) => row.instrument },
	{ key: 'type', label: 'Tipo', render: (row) => row.type },
	{ key: 'quantity', label: 'Quantidade', render: (row) => row.quantity },
	{ key: 'price', label: 'Preço', render: (row) => `R$ ${row.price.toFixed(2)}` },
];

const data: OrderRow[] = [
	{ id: '1', instrument: 'PETR4', type: 'Compra', quantity: 100, price: 29.9 },
	{ id: '2', instrument: 'VALE3', type: 'Venda', quantity: 50, price: 63.4 },
];

type OrderTableProps = TableProps<OrderRow>;

const OrderTable = (props: OrderTableProps) => <Table<OrderRow> {...props} />;

const meta: Meta<typeof OrderTable> = {
	title: 'UI/Table',
	component: OrderTable,
	args: {
		caption: 'Ordens',
		columns,
		data,
		emptyStateMessage: 'Nenhuma ordem encontrada.',
	},
};

export default meta;
type Story = StoryObj<typeof OrderTable>;

export const Default: Story = {};

export const EmptyState: Story = {
	args: {
		data: [],
	},
};

export const ClickableRows: Story = {
	args: {
		onRowClick: () => undefined,
	},
};
