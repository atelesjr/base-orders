import type { OrdersGridFilterState } from '../types';
import type { FilterSelectOption } from './FilterSelect';

export type FiltersFormState = {
	id: string;
	instrument: string;
	status: string;
	side: string;
	date: string;
};

export const FILTER_FORM_KEYS: Array<keyof FiltersFormState> = [
	'id',
	'instrument',
	'status',
	'side',
	'date',
];

export type TextFilterFieldConfig = {
	key: 'id' | 'instrument';
	id: string;
	label: string;
	placeholder: string;
};

export type SelectFilterFieldConfig = {
	key: 'status' | 'side';
	id: string;
	label: string;
	options: FilterSelectOption[];
};

export type DateFilterFieldConfig = {
	key: 'date';
	id: string;
	label: string;
};

export const TEXT_FILTER_FIELDS: TextFilterFieldConfig[] = [
	{
		key: 'id',
		id: 'orders-filter-id',
		label: 'ID',
		placeholder: 'Ex: 1001',
	},
	{
		key: 'instrument',
		id: 'orders-filter-instrument',
		label: 'Instrumento',
		placeholder: 'Ex: PETR4',
	},
];

export const SELECT_FILTER_FIELDS: SelectFilterFieldConfig[] = [
	{
		key: 'status',
		id: 'orders-filter-status',
		label: 'Status',
		options: [
			{ label: 'Todos', value: '' },
			{ label: 'Aberta', value: 'Aberta' },
			{ label: 'Parcial', value: 'Parcial' },
			{ label: 'Executada', value: 'Executada' },
			{ label: 'Cancelada', value: 'Cancelada' },
		],
	},
	{
		key: 'side',
		id: 'orders-filter-side',
		label: 'Lado',
		options: [
			{ label: 'Todos', value: '' },
			{ label: 'Compra', value: 'Compra' },
			{ label: 'Venda', value: 'Venda' },
		],
	},
];

export const DATE_FILTER_FIELD: DateFilterFieldConfig = {
	key: 'date',
	id: 'orders-filter-date',
	label: 'Data',
};

export const toFiltersFormState = (
	filters: OrdersGridFilterState,
): FiltersFormState => ({
	id: filters.id ?? '',
	instrument: filters.instrument ?? '',
	status: filters.status ?? '',
	side: filters.side ?? '',
	date: filters.date ?? '',
});

export const emptyFiltersFormState = (): FiltersFormState => ({
	id: '',
	instrument: '',
	status: '',
	side: '',
	date: '',
});
