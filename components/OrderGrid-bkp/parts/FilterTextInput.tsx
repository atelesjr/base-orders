type OrdersGridFilterTextInputProps = {
	id: string;
	label: string;
	value: string;
	placeholder: string;
	onChange: (nextValue: string) => void;
};

export const OrdersGridFilterTextInput = ({
	id,
	label,
	value,
	placeholder,
	onChange,
}: OrdersGridFilterTextInputProps) => {
	return (
		<label className="orders-grid__filter-field" htmlFor={id}>
			<span>{label}</span>
			<input
				id={id}
				onChange={(event) => {
					onChange(event.target.value);
				}}
				placeholder={placeholder}
				type="text"
				value={value}
			/>
		</label>
	);
};
