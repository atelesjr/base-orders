import type { DatePickerInputPartProps } from '../date-picker-input.types';
import { useDatePickerInputContext } from './DatePickerInputContext';

export const DatePickerInputLabel = ({
	className,
	children,
}: DatePickerInputPartProps) => {
	const { label, inputId } = useDatePickerInputContext();

	if (!label && !children) {
		return null;
	}

	const classes = ['ui-date-picker-input__label', className]
		.filter(Boolean)
		.join(' ');

	return (
		<label className={classes} htmlFor={inputId}>
			{children ?? label}
		</label>
	);
};
