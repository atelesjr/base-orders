import type { SelectInputPartProps } from '../select-input.types';
import { useSelectInputContext } from './SelectInputContext';

export const SelectInputError = ({ className, children }: SelectInputPartProps) => {
	const { errorMessage, errorId } = useSelectInputContext();

	if (!errorMessage && !children) {
		return null;
	}

	const classes = ['ui-select-input__error', className].filter(Boolean).join(' ');

	return (
		<p className={classes} id={errorId} role="alert">
			{children ?? errorMessage}
		</p>
	);
};
