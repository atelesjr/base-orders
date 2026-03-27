import type { CalendarCell } from './date-picker-input.types';

export const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export const parseIsoDate = (value: string): Date | null => {
	if (!value) {
		return null;
	}

	const [year, month, day] = value.split('-').map(Number);
	if (!year || !month || !day) {
		return null;
	}

	const parsedDate = new Date(year, month - 1, day);
	if (
		parsedDate.getFullYear() !== year ||
		parsedDate.getMonth() !== month - 1 ||
		parsedDate.getDate() !== day
	) {
		return null;
	}

	return parsedDate;
};

export const toIsoDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export const formatInputDate = (
	value: string,
	placeholder = 'dd/mm/aaaa',
): string => {
	const parsedDate = parseIsoDate(value);
	if (!parsedDate) {
		return placeholder;
	}

	const day = String(parsedDate.getDate()).padStart(2, '0');
	const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
	return `${day}/${month}/${parsedDate.getFullYear()}`;
};

export const getMonthLabel = (displayDate: Date): string => {
	return new Intl.DateTimeFormat('pt-BR', {
		month: 'long',
		year: 'numeric',
	}).format(displayDate);
};

export const buildCalendarCells = (displayDate: Date): CalendarCell[] => {
	const year = displayDate.getFullYear();
	const month = displayDate.getMonth();
	const firstDayOfMonth = new Date(year, month, 1);
	const firstWeekDay = firstDayOfMonth.getDay();
	const firstCellDate = new Date(year, month, 1 - firstWeekDay);

	return Array.from({ length: 42 }, (_, index) => {
		const date = new Date(firstCellDate);
		date.setDate(firstCellDate.getDate() + index);

		return {
			date,
			isCurrentMonth: date.getMonth() === month,
		};
	});
};
