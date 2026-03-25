import TextInput from '@/components/ui/inputs/TextInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import DatePickerInput from '@/components/ui/inputs/DatePickerInput';
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

			<div className="orders-grid__filter-field">
				<DatePickerInput.Root
					aria-label={DATE_FILTER_FIELD.label}
					className="orders-grid__filter-date-input"
					id={DATE_FILTER_FIELD.id}
					label={DATE_FILTER_FIELD.label}
					name={DATE_FILTER_FIELD.key}
					onValueChange={(nextValue) => {
						onFieldChange(DATE_FILTER_FIELD.key, nextValue);
					}}
					value={formState.date}
				>
					<DatePickerInput.Label />
					<DatePickerInput.Trigger />
					<DatePickerInput.Popover className="orders-grid__filter-date-popover" />
					<DatePickerInput.Error />
				</DatePickerInput.Root>
			</div>
		</div>
	);
};
