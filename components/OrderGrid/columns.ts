import { formatTimestampBR } from '@/lib/orders/orders.formatters';
import type { OrdersGridColumn } from './types';

export const defaultColumns: OrdersGridColumn[] = [
	{
		key: 'instrument',
		label: 'Instrumento',
		render: (order) => order.instrument,
	},
	{
		key: 'side',
		label: 'Lado',
		render: (order) => order.side,
	},
	{
		key: 'price',
		label: 'Preço',
		render: (order) => order.price,
	},
	{
		key: 'quantity',
		label: 'Qtd',
		render: (order) => order.quantity,
	},
	{
		key: 'remainingQuantity',
		label: 'Qtd Restante',
		render: (order) => order.remainingQuantity,
	},
	{
		key: 'status',
		label: 'Status',
		render: (order) => order.status,
	},
	{
		key: 'timestamp',
		label: 'Data/Hora',
		render: (order) => formatTimestampBR(order.timestamp),
	},
];
