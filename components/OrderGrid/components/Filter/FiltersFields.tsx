import TextInput from '@/components/ui/inputs/TextInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import { OrdersGridFilterDatePicker } from './FilterDatePicker';
import {
	DATE_FILTER_FIELD,
	SELECT_FILTER_FIELDS,
	TEXT_FILTER_FIELDS,
	type FiltersFormState,
} from './filters.config';

type OrdersGridFiltersFieldsProps = {
	formState: FiltersFormState;
	onFieldChange: (field: keyof FiltersFormState, value: string) => void;
};

export const OrdersGridFiltersFields = ({
	formState,
	onFieldChange,
}: OrdersGridFiltersFieldsProps) => {
	return (
		<div className="orders-grid__filters-grid">
			{TEXT_FILTER_FIELDS.map((field) => (
				<div className="orders-grid__filter-field" key={field.key}>
					<TextInput
						id={field.id}
						label={field.label}
						onValueChange={(nextValue) => {
							onFieldChange(field.key, nextValue);
						}}
						placeholder={field.placeholder}
						type="text"
						value={formState[field.key]}
					/>
				</div>
			))}

			{SELECT_FILTER_FIELDS.map((field) => (
				<div className="orders-grid__filter-field" key={field.key}>
					<SelectInput
						aria-label={field.label}
						className="orders-grid__filter-select-input"
						id={field.id}
						label={field.label}
						name={field.key}
						onValueChange={(nextValue) => {
							onFieldChange(field.key, nextValue);
						}}
						options={field.options}
						value={formState[field.key]}
					/>
				</div>
			))}

			<label className="orders-grid__filter-field" htmlFor={DATE_FILTER_FIELD.id}>
				<span>{DATE_FILTER_FIELD.label}</span>
				<OrdersGridFilterDatePicker
					ariaLabel={DATE_FILTER_FIELD.label}
					id={DATE_FILTER_FIELD.id}
					onChange={(nextValue) => {
						onFieldChange(DATE_FILTER_FIELD.key, nextValue);
					}}
					value={formState.date}
				/>
			</label>
		</div>
	);
};
