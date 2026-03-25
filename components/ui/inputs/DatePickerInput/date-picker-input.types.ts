import type { ReactNode } from 'react';

export type DatePickerInputProps = {
	id?: string;
	name?: string;
	value?: string;
	defaultValue?: string;
	disabled?: boolean;
	className?: string;
	'aria-label'?: string;
	invalid?: boolean;
	label?: string;
	errorMessage?: string;
	placeholder?: string;
	onChange?: (nextValue: string) => void;
	onValueChange?: (nextValue: string) => void;
};

export type DatePickerInputRootProps = DatePickerInputProps & {
	children?: ReactNode;
};

export type DatePickerInputPartProps = {
	className?: string;
	children?: ReactNode;
};

export type CalendarCell = {
	date: Date;
	isCurrentMonth: boolean;
};
