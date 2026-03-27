import { useId } from 'react';
import type { DatePickerInputRootProps } from '../date-picker-input.types';
import { formatInputDate, WEEK_DAYS } from '../date-picker-input.utils';
import { useDatePickerInputController } from '../useDatePickerInputController';
import { DatePickerInputContext } from './DatePickerInputContext';
import { DatePickerInputError } from './DatePickerInputError';
import { DatePickerInputLabel } from './DatePickerInputLabel';
import { DatePickerInputPopover } from './DatePickerInputPopover';
import { DatePickerInputTrigger } from './DatePickerInputTrigger';

export const DatePickerInputRoot = ({
	defaultValue,
	className,
	disabled = false,
	errorMessage,
	id,
	invalid = false,
	label,
	name,
	placeholder = 'dd/mm/aaaa',
	'aria-label': ariaLabel,
	onChange,
	onValueChange,
	value,
	children,
}: DatePickerInputRootProps) => {
	const generatedId = useId();
	const inputId = id ?? `date-picker-input-${generatedId}`;
	const errorId = errorMessage ? `${inputId}-error` : undefined;
	const monthId = `${inputId}-month`;

	const {
		wrapperRef,
		isOpen,
		selectedValue,
		monthLabel,
		calendarCells,
		todayIsoDate,
		toggleOpen,
		setValue,
		goToPreviousMonth,
		goToNextMonth,
	} = useDatePickerInputController({
		value,
		defaultValue,
		onChange,
		onValueChange,
	});

	const classes = [
		'ui-date-picker-input__field',
		invalid ? 'ui-date-picker-input--invalid' : '',
		disabled ? 'ui-date-picker-input__field--disabled' : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	const contextValue = {
		inputId,
		errorId,
		monthId,
		name,
		label,
		errorMessage,
		placeholder,
		invalid,
		disabled,
		fieldClassName: classes,
		isOpen,
		selectedValue,
		monthLabel,
		calendarCells,
		todayIsoDate,
		weekDays: WEEK_DAYS,
		wrapperRef,
		toggleOpen,
		setValue,
		goToPreviousMonth,
		goToNextMonth,
		ariaLabel,
	};

	return (
		<DatePickerInputContext.Provider value={contextValue}>
			<div className="ui-date-picker-input" ref={wrapperRef}>
				<input name={name} type="hidden" value={selectedValue} />
				{children ?? (
					<>
						<DatePickerInputLabel />
						<DatePickerInputTrigger
							displayValue={formatInputDate(selectedValue, placeholder)}
						/>
						<DatePickerInputPopover />
						<DatePickerInputError />
					</>
				)}
			</div>
		</DatePickerInputContext.Provider>
	);
};
