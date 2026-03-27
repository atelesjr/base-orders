import type { SelectInputPartProps } from '../select-input.types';
import { useSelectInputContext } from './SelectInputContext';

export const SelectInputTrigger = ({ className }: SelectInputPartProps) => {
	const {
		selectId,
		errorId,
		listboxId,
		invalid,
		disabled,
		fieldClassName,
		isOpen,
		selectedLabel,
		toggleOpen,
		ariaLabel,
	} = useSelectInputContext();

	const classes = [fieldClassName, className].filter(Boolean).join(' ');

	return (
		<button
			id={selectId}
			aria-label={ariaLabel}
			aria-describedby={errorId}
			aria-invalid={invalid ? true : undefined}
			aria-controls={listboxId}
			aria-expanded={isOpen}
			aria-haspopup="listbox"
			role="combobox"
			className={classes}
			disabled={disabled}
			onClick={toggleOpen}
			type="button"
		>
			<span>{selectedLabel ?? ''}</span>
			<span aria-hidden="true" className="ui-select-input__caret">
				▾
			</span>
		</button>
	);
};
