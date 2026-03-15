import { formatTimestampBR } from '@/lib/orders/orders.formatters';
import type { OrdersGridColumn } from './types';

export const defaultColumns: OrdersGridColumn[] = [
	{
		key: 'instrument',
		label: 'Instrumento',
		width: '16%',
		render: (order) => order.instrument,
	},
	{
		key: 'side',
		label: 'Lado',
		width: '12%',
		render: (order) => order.side,
	},
	{
		key: 'price',
		label: 'Preço',
		width: '12%',
		render: (order) => order.price,
	},
	{
		key: 'quantity',
		label: 'Qtd',
		width: '12%',
		render: (order) => order.quantity,
	},
	{
		key: 'remainingQuantity',
		label: 'Qtd Restante',
		width: '12%',
		render: (order) => order.remainingQuantity,
	},
	{
		key: 'status',
		label: 'Status',
		width: '12%',
		render: (order) => order.status,
	},
	{
		key: 'timestamp',
		label: 'Data/Hora',
		width: '24%',
		render: (order) => formatTimestampBR(order.timestamp),
	},
];
