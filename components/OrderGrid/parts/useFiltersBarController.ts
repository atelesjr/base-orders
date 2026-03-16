import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { FILTER_FORM_KEYS, emptyFiltersFormState, toFiltersFormState, type FiltersFormState } from './filters.config';
import type { OrdersGridFilterState, OrdersGridSortState } from '../types';

type UseFiltersBarControllerArgs = {
	filters: OrdersGridFilterState;
	sortState: Pick<OrdersGridSortState, 'sortBy' | 'sortDir'>;
};

const setParam = (params: URLSearchParams, key: string, value?: string) => {
	if (value) {
		params.set(key, value);
		return;
	}

	params.delete(key);
};

const applyFormStateToParams = (
	params: URLSearchParams,
	formState: FiltersFormState,
) => {
	FILTER_FORM_KEYS.forEach((key) => {
		setParam(params, key, formState[key].trim());
	});
};

const clearFilterParams = (params: URLSearchParams) => {
	FILTER_FORM_KEYS.forEach((key) => {
		params.delete(key);
	});
};

const appendSortAndPageParams = (
	params: URLSearchParams,
	sortBy: OrdersGridSortState['sortBy'],
	sortDir: OrdersGridSortState['sortDir'],
) => {
	params.set('sortBy', sortBy);
	params.set('sortDir', sortDir);
	params.set('page', '1');
};

export const useFiltersBarController = ({
	filters,
	sortState,
}: UseFiltersBarControllerArgs) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [formState, setFormState] = useState<FiltersFormState>(
		toFiltersFormState(filters),
	);

	const setFieldValue = (field: keyof FiltersFormState, value: string) => {
		setFormState((currentState) => ({
			...currentState,
			[field]: value,
		}));
	};

	const applyFilters = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const params = new URLSearchParams(searchParams.toString());
		applyFormStateToParams(params, formState);
		appendSortAndPageParams(params, sortState.sortBy, sortState.sortDir);
		router.push(`${pathname}?${params.toString()}`);
	};

	const clearFilters = () => {
		setFormState(emptyFiltersFormState());
		const params = new URLSearchParams(searchParams.toString());
		clearFilterParams(params);
		appendSortAndPageParams(params, sortState.sortBy, sortState.sortDir);
		router.push(`${pathname}?${params.toString()}`);
	};

	return {
		formState,
		setFieldValue,
		applyFilters,
		clearFilters,
	};
};
