import { useId } from 'react';
import type { SelectInputRootProps } from '../select-input.types';
import { useSelectInputController } from '../useSelectInputController';
import { SelectInputError } from './SelectInputError';
import { SelectInputLabel } from './SelectInputLabel';
import { SelectInputMenu } from './SelectInputMenu';
import { SelectInputTrigger } from './SelectInputTrigger';
import { SelectInputContext } from './SelectInputContext';

export const SelectInputRoot = ({
	defaultValue,
	className,
	disabled = false,
	errorMessage,
	id,
	invalid = false,
	label,
	name,
	'aria-label': ariaLabel,
	onChange,
	onValueChange,
	options,
	value,
	children,
}: SelectInputRootProps) => {
	const generatedId = useId();
	const selectId = id ?? `select-input-${generatedId}`;
	const errorId = errorMessage ? `${selectId}-error` : undefined;
	const listboxId = `${selectId}-listbox`;

	const {
		wrapperRef,
		isOpen,
		selectedValue,
		selectedOption,
		toggleOpen,
		selectValue,
	} = useSelectInputController({
		options,
		value,
		defaultValue,
		onChange,
		onValueChange,
	});

	const classes = [
		'ui-select-input__field',
		invalid ? 'ui-select-input--invalid' : '',
		disabled ? 'ui-select-input__field--disabled' : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	const contextValue = {
		selectId,
		errorId,
		listboxId,
		name,
		label,
		errorMessage,
		invalid,
		disabled,
		fieldClassName: classes,
		options,
		isOpen,
		selectedValue,
		selectedLabel: selectedOption?.label,
		wrapperRef,
		toggleOpen,
		selectValue,
		ariaLabel,
	};

	return (
		<SelectInputContext.Provider value={contextValue}>
			<div className="ui-select-input" ref={wrapperRef}>
				<input name={name} type="hidden" value={selectedValue} />
				{children ?? (
					<>
						<SelectInputLabel />
						<SelectInputTrigger />
						<SelectInputMenu />
						<SelectInputError />
					</>
				)}
			</div>
		</SelectInputContext.Provider>
	);
};
