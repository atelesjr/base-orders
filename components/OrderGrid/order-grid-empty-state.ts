import type { OrdersGridFilterState } from './types';

export const getOrderGridEmptyStateMessage = (
	filters: OrdersGridFilterState,
): string => {
	if (filters.instrument) {
		return `${filters.instrument} nao encontrado.`;
	}

	if (filters.id) {
		return `ID ${filters.id} nao encontrado.`;
	}

	const hasAnyActiveFilter = Boolean(
		filters.id ||
			filters.instrument ||
			filters.status ||
			filters.side ||
			filters.date,
	);

	if (!hasAnyActiveFilter) {
		return 'Nenhuma ordem encontrada.';
	}

	return 'Nenhuma ordem encontrada para os filtros aplicados.';
};
