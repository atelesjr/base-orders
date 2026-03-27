import { createContext, useContext } from 'react';
import type { RefObject } from 'react';
import type { CalendarCell } from '../date-picker-input.types';

export type DatePickerInputContextValue = {
	inputId: string;
	errorId?: string;
	monthId: string;
	name?: string;
	label?: string;
	errorMessage?: string;
	placeholder: string;
	invalid: boolean;
	disabled: boolean;
	fieldClassName: string;
	isOpen: boolean;
	selectedValue: string;
	monthLabel: string;
	calendarCells: CalendarCell[];
	todayIsoDate: string;
	weekDays: string[];
	wrapperRef: RefObject<HTMLDivElement | null>;
	toggleOpen: () => void;
	setValue: (nextValue: string) => void;
	goToPreviousMonth: () => void;
	goToNextMonth: () => void;
	ariaLabel?: string;
};

export const DatePickerInputContext =
	createContext<DatePickerInputContextValue | null>(null);

export const useDatePickerInputContext = () => {
	const context = useContext(DatePickerInputContext);

	if (!context) {
		throw new Error(
			'DatePickerInput compound parts must be used inside DatePickerInput.Root',
		);
	}

	return context;
};
