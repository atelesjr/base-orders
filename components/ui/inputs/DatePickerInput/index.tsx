import type { JSX } from 'react';
import './DatePickerInput.styles.css';
import type {
	DatePickerInputPartProps,
	DatePickerInputProps,
	DatePickerInputRootProps,
} from './date-picker-input.types';
import { DatePickerInputError } from './components/DatePickerInputError';
import { DatePickerInputLabel } from './components/DatePickerInputLabel';
import { DatePickerInputPopover } from './components/DatePickerInputPopover';
import { DatePickerInputRoot } from './components/DatePickerInputRoot';
import { DatePickerInputTrigger } from './components/DatePickerInputTrigger';

type DatePickerInputCompoundComponent = ((
	props: DatePickerInputProps,
) => JSX.Element) & {
	Root: typeof DatePickerInputRoot;
	Label: typeof DatePickerInputLabel;
	Trigger: typeof DatePickerInputTrigger;
	Popover: typeof DatePickerInputPopover;
	Error: typeof DatePickerInputError;
};

const DatePickerInput = ((props: DatePickerInputProps) => {
	return <DatePickerInputRoot {...props} />;
}) as DatePickerInputCompoundComponent;

DatePickerInput.Root = DatePickerInputRoot;
DatePickerInput.Label = DatePickerInputLabel;
DatePickerInput.Trigger = DatePickerInputTrigger;
DatePickerInput.Popover = DatePickerInputPopover;
DatePickerInput.Error = DatePickerInputError;

export default DatePickerInput;
export type {
	DatePickerInputProps,
	DatePickerInputRootProps,
	DatePickerInputPartProps,
};
