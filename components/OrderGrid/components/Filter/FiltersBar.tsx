'use client';

import './Filter.styles.css';

import { OrdersGridFiltersActions } from './FiltersActions';
import { OrdersGridFiltersFields } from './FiltersFields';
import { useFiltersBarController } from './useFiltersBarController';
import type { OrdersGridFilterState, OrdersGridSortState } from '../../types';

type OrdersGridFiltersBarProps = {
	filters: OrdersGridFilterState;
	sortState: Pick<OrdersGridSortState, 'sortBy' | 'sortDir'>;
};

export const OrdersGridFiltersBar = ({
	filters,
	sortState,
}: OrdersGridFiltersBarProps) => {
	const { formState, setFieldValue, applyFilters, clearFilters } =
		useFiltersBarController({ filters, sortState });

	return (
		<form
			className="orders-grid__filters"
			key={JSON.stringify(filters)}
			onSubmit={applyFilters}
		>
			<OrdersGridFiltersFields formState={formState} onFieldChange={setFieldValue} />
			<OrdersGridFiltersActions onClear={clearFilters} />
		</form>
	);
};
