import type { SelectInputPartProps } from '../select-input.types';
import { useSelectInputContext } from './SelectInputContext';

export const SelectInputMenu = ({ className }: SelectInputPartProps) => {
	const { listboxId, options, selectedValue, isOpen, selectValue } =
		useSelectInputContext();

	if (!isOpen) {
		return null;
	}

	const classes = ['ui-select-input__menu', className].filter(Boolean).join(' ');

	return (
		<ul className={classes} id={listboxId} role="listbox">
			{options.map((option) => {
				const isSelected = option.value === selectedValue;

				return (
					<li key={option.value}>
						<button
							aria-selected={isSelected}
							className={`ui-select-input__option${
								isSelected ? ' ui-select-input__option--selected' : ''
							}`}
							disabled={option.disabled}
							onClick={() => {
								selectValue(option.value);
							}}
							role="option"
							type="button"
						>
							{option.label}
						</button>
					</li>
				);
			})}
		</ul>
	);
};
