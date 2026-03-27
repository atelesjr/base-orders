import type { DatePickerInputPartProps } from '../date-picker-input.types';
import { useDatePickerInputContext } from './DatePickerInputContext';

export const DatePickerInputError = ({
	className,
	children,
}: DatePickerInputPartProps) => {
	const { errorMessage, errorId } = useDatePickerInputContext();

	if (!errorMessage && !children) {
		return null;
	}

	const classes = ['ui-date-picker-input__error', className]
		.filter(Boolean)
		.join(' ');

	return (
		<p className={classes} id={errorId} role="alert">
			{children ?? errorMessage}
		</p>
	);
};
