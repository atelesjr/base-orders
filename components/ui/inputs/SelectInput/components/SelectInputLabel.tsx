import type { SelectInputPartProps } from '../select-input.types';
import { useSelectInputContext } from './SelectInputContext';

export const SelectInputLabel = ({ className, children }: SelectInputPartProps) => {
	const { label, selectId } = useSelectInputContext();

	if (!label && !children) {
		return null;
	}

	const classes = ['ui-select-input__label', className].filter(Boolean).join(' ');

	return (
		<label className={classes} htmlFor={selectId}>
			{children ?? label}
		</label>
	);
};
