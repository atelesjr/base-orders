import { createContext, useContext } from 'react';
import type { RefObject } from 'react';
import type { SelectOption } from '../select-input.types';

export type SelectInputContextValue = {
	selectId: string;
	errorId?: string;
	listboxId: string;
	name?: string;
	label?: string;
	errorMessage?: string;
	invalid: boolean;
	disabled: boolean;
	fieldClassName: string;
	options: SelectOption[];
	isOpen: boolean;
	selectedValue: string;
	selectedLabel?: string;
	wrapperRef: RefObject<HTMLDivElement | null>;
	toggleOpen: () => void;
	selectValue: (nextValue: string) => void;
	ariaLabel?: string;
};

export const SelectInputContext =
	createContext<SelectInputContextValue | null>(null);

export const useSelectInputContext = () => {
	const context = useContext(SelectInputContext);

	if (!context) {
		throw new Error(
			'SelectInput compound parts must be used inside SelectInput.Root',
		);
	}

	return context;
};
