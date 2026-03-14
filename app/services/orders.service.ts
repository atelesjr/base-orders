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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const ordersService = {
	async getOrders(): Promise<Order[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/orders`, {
				cache: 'no-store', // Disable caching for real-time data
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching orders:', error);
			throw error;
		}
	},

	async getOrderById(id: string): Promise<Order | null> {
		try {
			const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
				cache: 'no-store',
			});

			if (!response.ok) {
				if (response.status === 404) return null;
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching order ${id}:`, error);
			throw error;
		}
	},
};
