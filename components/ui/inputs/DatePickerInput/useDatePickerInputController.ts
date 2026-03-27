import { useEffect, useMemo, useRef, useState } from 'react';
import {
	buildCalendarCells,
	getMonthLabel,
	parseIsoDate,
	toIsoDate,
} from './date-picker-input.utils';

type UseDatePickerInputControllerArgs = {
	value?: string;
	defaultValue?: string;
	onChange?: (nextValue: string) => void;
	onValueChange?: (nextValue: string) => void;
};

export const useDatePickerInputController = ({
	value,
	defaultValue,
	onChange,
	onValueChange,
}: UseDatePickerInputControllerArgs) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const isControlled = value !== undefined;
	const initialValue = defaultValue !== undefined ? String(defaultValue) : '';
	const [internalValue, setInternalValue] = useState(initialValue);
	const [isOpen, setIsOpen] = useState(false);
	const selectedValue = isControlled ? String(value ?? '') : internalValue;

	const [displayDate, setDisplayDate] = useState<Date>(
		parseIsoDate(selectedValue) ?? new Date(),
	);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (!wrapperRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen]);

	const monthLabel = useMemo(() => getMonthLabel(displayDate), [displayDate]);
	const calendarCells = useMemo(
		() => buildCalendarCells(displayDate),
		[displayDate],
	);

	const todayIsoDate = toIsoDate(new Date());

	const open = () => {
		setDisplayDate(parseIsoDate(selectedValue) ?? new Date());
		setIsOpen(true);
	};

	const close = () => {
		setIsOpen(false);
	};

	const toggleOpen = () => {
		if (isOpen) {
			close();
			return;
		}

		open();
	};

	const setValue = (nextValue: string) => {
		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onChange?.(nextValue);
		onValueChange?.(nextValue);
		close();
	};

	const goToPreviousMonth = () => {
		setDisplayDate(
			(currentDate) =>
				new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
		);
	};

	const goToNextMonth = () => {
		setDisplayDate(
			(currentDate) =>
				new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
		);
	};

	return {
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
	};
};
