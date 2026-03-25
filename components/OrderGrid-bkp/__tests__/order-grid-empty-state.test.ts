import { getOrderGridEmptyStateMessage } from '../order-grid-empty-state';

describe('order-grid-empty-state', () => {
	it('returns instrument-specific message when instrument filter is active', () => {
		expect(
			getOrderGridEmptyStateMessage({ instrument: 'READL3' }),
		).toBe('READL3 nao encontrado.');
	});

	it('returns id-specific message when id filter is active', () => {
		expect(getOrderGridEmptyStateMessage({ id: '1001' })).toBe(
			'ID 1001 nao encontrado.',
		);
	});

	it('returns generic empty message when no filters are active', () => {
		expect(getOrderGridEmptyStateMessage({})).toBe('Nenhuma ordem encontrada.');
	});

	it('returns filtered empty message when non-priority filters are active', () => {
		expect(getOrderGridEmptyStateMessage({ status: 'Executada' })).toBe(
			'Nenhuma ordem encontrada para os filtros aplicados.',
		);
	});
});
