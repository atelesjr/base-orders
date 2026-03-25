import TextInput from '@/components/ui/inputs/TextInput';
import { OrdersGridFilterDatePicker } from './FilterDatePicker';
import { OrdersGridFilterSelect } from './FilterSelect';
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
				<label className="orders-grid__filter-field" htmlFor={field.id} key={field.key}>
					<span>{field.label}</span>
					<OrdersGridFilterSelect
						ariaLabel={field.label}
						id={field.id}
						name={field.key}
						onChange={(nextValue) => {
							onFieldChange(field.key, nextValue);
						}}
						options={field.options}
						value={formState[field.key]}
					/>
				</label>
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
