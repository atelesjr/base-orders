'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type OrdersGridFilterDatePickerProps = {
	id: string;
	ariaLabel: string;
	value: string;
	onChange: (nextValue: string) => void;
};

type CalendarCell = {
	date: Date;
	isCurrentMonth: boolean;
};

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const parseIsoDate = (value: string): Date | null => {
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

const toIsoDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const formatInputDate = (value: string): string => {
	const parsedDate = parseIsoDate(value);
	if (!parsedDate) {
		return 'dd/mm/aaaa';
	}

	const day = String(parsedDate.getDate()).padStart(2, '0');
	const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
	return `${day}/${month}/${parsedDate.getFullYear()}`;
};

const getMonthLabel = (displayDate: Date): string => {
	return new Intl.DateTimeFormat('pt-BR', {
		month: 'long',
		year: 'numeric',
	}).format(displayDate);
};

const buildCalendarCells = (displayDate: Date): CalendarCell[] => {
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

export const OrdersGridFilterDatePicker = ({
	id,
	ariaLabel,
	value,
	onChange,
}: OrdersGridFilterDatePickerProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const parsedValue = parseIsoDate(value);
	const [isOpen, setIsOpen] = useState(false);
	const [displayDate, setDisplayDate] = useState<Date>(
		parsedValue ?? new Date(),
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
	const calendarCells = useMemo(() => buildCalendarCells(displayDate), [displayDate]);

	const selectedIsoDate = value;
	const todayIsoDate = toIsoDate(new Date());

	return (
		<div className="orders-grid__date-picker" ref={wrapperRef}>
			<button
				aria-expanded={isOpen}
				aria-haspopup="dialog"
				aria-label={ariaLabel}
				className="orders-grid__date-picker-trigger"
				id={id}
				onClick={() => {
					setDisplayDate(parsedValue ?? new Date());
					setIsOpen((currentState) => !currentState);
				}}
				type="button"
			>
				<span>{formatInputDate(value)}</span>
				<span aria-hidden="true">📅</span>
			</button>

			{isOpen ? (
				<div className="orders-grid__date-picker-popover" role="dialog">
					<div className="orders-grid__date-picker-header">
						<strong>{monthLabel}</strong>
						<div className="orders-grid__date-picker-nav">
							<button
								aria-label="Mês anterior"
								onClick={() => {
									setDisplayDate(
										(currentDate) =>
											new Date(
												currentDate.getFullYear(),
												currentDate.getMonth() - 1,
												1,
											),
									);
								}}
								type="button"
							>
								‹
							</button>
							<button
								aria-label="Próximo mês"
								onClick={() => {
									setDisplayDate(
										(currentDate) =>
											new Date(
												currentDate.getFullYear(),
												currentDate.getMonth() + 1,
												1,
											),
									);
								}}
								type="button"
							>
								›
							</button>
						</div>
					</div>

					<div className="orders-grid__date-picker-weekdays">
						{WEEK_DAYS.map((weekDay, index) => (
							<span key={`${weekDay}-${index}`}>{weekDay}</span>
						))}
					</div>

					<div className="orders-grid__date-picker-grid">
						{calendarCells.map((cell) => {
							const cellIsoDate = toIsoDate(cell.date);
							const isSelected = cellIsoDate === selectedIsoDate;
							const isToday = cellIsoDate === todayIsoDate;

							return (
								<button
									className={`orders-grid__date-picker-day ${
										!cell.isCurrentMonth
											? 'orders-grid__date-picker-day--outside'
											: ''
									} ${
										isToday ? 'orders-grid__date-picker-day--today' : ''
									} ${
										isSelected
											? 'orders-grid__date-picker-day--selected'
											: ''
									}`.trim()}
									key={cellIsoDate}
									onClick={() => {
										onChange(cellIsoDate);
										setIsOpen(false);
									}}
									type="button"
								>
									{cell.date.getDate()}
								</button>
							);
						})}
					</div>

					<div className="orders-grid__date-picker-actions">
						<button
							onClick={() => {
								onChange('');
								setIsOpen(false);
							}}
							type="button"
						>
							Limpar
						</button>
						<button
							onClick={() => {
								onChange(todayIsoDate);
								setIsOpen(false);
							}}
							type="button"
						>
							Hoje
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
};
