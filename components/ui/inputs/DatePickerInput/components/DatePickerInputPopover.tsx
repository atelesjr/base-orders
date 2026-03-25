import { toIsoDate } from '../date-picker-input.utils';
import type { DatePickerInputPartProps } from '../date-picker-input.types';
import { useDatePickerInputContext } from './DatePickerInputContext';

export const DatePickerInputPopover = ({
	className,
}: DatePickerInputPartProps) => {
	const {
		isOpen,
		monthId,
		monthLabel,
		calendarCells,
		selectedValue,
		todayIsoDate,
		weekDays,
		goToPreviousMonth,
		goToNextMonth,
		setValue,
	} = useDatePickerInputContext();

	if (!isOpen) {
		return null;
	}

	const classes = ['ui-date-picker-input__popover', className]
		.filter(Boolean)
		.join(' ');

	return (
		<div aria-labelledby={monthId} className={classes} role="dialog">
			<div className="ui-date-picker-input__header">
				<strong id={monthId}>{monthLabel}</strong>
				<div className="ui-date-picker-input__nav">
					<button
						aria-label="Mês anterior"
						onClick={goToPreviousMonth}
						type="button"
					>
						‹
					</button>
					<button
						aria-label="Próximo mês"
						onClick={goToNextMonth}
						type="button"
					>
						›
					</button>
				</div>
			</div>

			<div className="ui-date-picker-input__weekdays">
				{weekDays.map((weekDay, index) => (
					<span key={`${weekDay}-${index}`}>{weekDay}</span>
				))}
			</div>

			<div className="ui-date-picker-input__grid">
				{calendarCells.map((cell) => {
					const cellIsoDate = toIsoDate(cell.date);
					const isSelected = cellIsoDate === selectedValue;
					const isToday = cellIsoDate === todayIsoDate;

					const dayClasses = [
						'ui-date-picker-input__day',
						!cell.isCurrentMonth
							? 'ui-date-picker-input__day--outside'
							: '',
						isToday ? 'ui-date-picker-input__day--today' : '',
						isSelected ? 'ui-date-picker-input__day--selected' : '',
					]
						.filter(Boolean)
						.join(' ');

					return (
						<button
							className={dayClasses}
							key={cellIsoDate}
							onClick={() => {
								setValue(cellIsoDate);
							}}
							type="button"
						>
							{cell.date.getDate()}
						</button>
					);
				})}
			</div>

			<div className="ui-date-picker-input__actions">
				<button
					onClick={() => {
						setValue('');
					}}
					type="button"
				>
					Limpar
				</button>
				<button
					onClick={() => {
						setValue(todayIsoDate);
					}}
					type="button"
				>
					Hoje
				</button>
			</div>
		</div>
	);
};
