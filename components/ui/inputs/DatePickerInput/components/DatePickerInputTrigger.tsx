import type { DatePickerInputPartProps } from '../date-picker-input.types';
import { useDatePickerInputContext } from './DatePickerInputContext';

type DatePickerInputTriggerProps = DatePickerInputPartProps & {
	displayValue?: string;
};

export const DatePickerInputTrigger = ({
	className,
	displayValue,
}: DatePickerInputTriggerProps) => {
	const {
		inputId,
		errorId,
		monthId,
		placeholder,
		disabled,
		fieldClassName,
		isOpen,
		selectedValue,
		toggleOpen,
		ariaLabel,
	} = useDatePickerInputContext();

	const classes = [fieldClassName, className].filter(Boolean).join(' ');

	return (
		<button
			id={inputId}
			aria-label={ariaLabel}
			aria-describedby={errorId}
			aria-expanded={isOpen}
			aria-haspopup="dialog"
			aria-controls={isOpen ? monthId : undefined}
			className={classes}
			disabled={disabled}
			onClick={toggleOpen}
			type="button"
		>
			<span>
				{displayValue ?? (selectedValue ? selectedValue : placeholder)}
			</span>
			<span aria-hidden="true" className="ui-date-picker-input__icon">
				📅
			</span>
		</button>
	);
};
