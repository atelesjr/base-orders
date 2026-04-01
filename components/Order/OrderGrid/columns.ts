import { formatTimestampBR } from '@/lib/orders/orders.formatters';
import type { OrdersGridColumn } from './types';

export const defaultColumns: OrdersGridColumn[] = [
	{
		key: 'id',
		label: 'ID',
		width: '10%',
		render: (order) => order.id,
	},
	{
		key: 'instrument',
		label: 'Instrumento',
		width: '14%',
		sortKey: 'instrument',
		render: (order) => order.instrument,
	},
	{
		key: 'side',
		label: 'Lado',
		width: '11%',
		sortKey: 'side',
		render: (order) => order.side,
	},
	{
		key: 'price',
		label: 'Preço',
		width: '11%',
		sortKey: 'price',
		render: (order) => order.price,
	},
	{
		key: 'quantity',
		label: 'Qtd',
		width: '11%',
		sortKey: 'quantity',
		render: (order) => order.quantity,
	},
	{
		key: 'remainingQuantity',
		label: 'Qtd Restante',
		width: '11%',
		sortKey: 'remainingQuantity',
		render: (order) => order.remainingQuantity,
	},
	{
		key: 'status',
		label: 'Status',
		width: '12%',
		sortKey: 'status',
		render: (order) => order.status,
	},
	{
		key: 'timestamp',
		label: 'Data/Hora',
		width: '20%',
		sortKey: 'timestamp',
		render: (order) => formatTimestampBR(order.timestamp),
	},
];
