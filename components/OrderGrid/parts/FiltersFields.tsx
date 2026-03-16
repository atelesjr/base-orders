import { UIFormField } from '@/components/ui/FormField';
import { UITextInput } from '@/components/ui/TextInput';
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
				<UIFormField
					className="orders-grid__filter-field"
					id={field.id}
					key={field.key}
					label={field.label}
				>
					<UITextInput
						id={field.id}
						onChange={(nextValue) => {
							onFieldChange(field.key, nextValue);
						}}
						placeholder={field.placeholder}
						type="text"
						value={formState[field.key]}
					/>
				</UIFormField>
			))}

			{SELECT_FILTER_FIELDS.map((field) => (
				<UIFormField
					className="orders-grid__filter-field"
					id={field.id}
					key={field.key}
					label={field.label}
				>
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
				</UIFormField>
			))}

			<UIFormField
				className="orders-grid__filter-field"
				id={DATE_FILTER_FIELD.id}
				label={DATE_FILTER_FIELD.label}
			>
				<OrdersGridFilterDatePicker
					ariaLabel={DATE_FILTER_FIELD.label}
					id={DATE_FILTER_FIELD.id}
					onChange={(nextValue) => {
						onFieldChange(DATE_FILTER_FIELD.key, nextValue);
					}}
					value={formState.date}
				/>
			</UIFormField>
		</div>
	);
};
