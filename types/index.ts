export interface Order {
	id: string;
	instrument: string;
	side: 'Compra' | 'Venda';
	price: number;
	quantity: number;
	remainingQuantity: number;
	status: 'Aberta' | 'Executada' | 'Parcial' | 'Cancelada';
	timestamp: string;
	statusHistory: Array<{
		status: string;
		updatedAt: string;
	}>;
}
