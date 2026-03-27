export type OrderSide = 'Compra' | 'Venda';
export type OrderStatus = 'Aberta' | 'Parcial' | 'Executada' | 'Cancelada';

export interface OrderStatusHistoryItem {
	status: OrderStatus;
	updatedAt: string;
}

export interface Order {
	id: string;
	clientOrderId?: string;
	exchangeOrderId?: string | null;
	executionId?: string | null;
	instrument: string;
	side: OrderSide;
	price: number;
	quantity: number;
	remainingQuantity: number;
	status: OrderStatus;
	timestamp: string;
	statusHistory: OrderStatusHistoryItem[];
}
