import { useEffect, useMemo, useRef, useState } from 'react';
import type { SelectOption } from './select-input.types';

type UseSelectInputControllerArgs = {
	options: SelectOption[];
	value?: string;
	defaultValue?: string;
	onChange?: (nextValue: string) => void;
	onValueChange?: (nextValue: string) => void;
};

export const useSelectInputController = ({
	options,
	value,
	defaultValue,
	onChange,
	onValueChange,
}: UseSelectInputControllerArgs) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const isControlled = value !== undefined;
	const initialValue =
		defaultValue !== undefined ? String(defaultValue) : (options[0]?.value ?? '');

	const [internalValue, setInternalValue] = useState(initialValue);
	const [isOpen, setIsOpen] = useState(false);

	const selectedValue = isControlled ? String(value ?? '') : internalValue;

	const selectedOption = useMemo(
		() => options.find((option) => option.value === selectedValue) ?? options[0],
		[options, selectedValue],
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

	const toggleOpen = () => {
		setIsOpen((currentState) => !currentState);
	};

	const close = () => {
		setIsOpen(false);
	};

	const selectValue = (nextValue: string) => {
		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onChange?.(nextValue);
		onValueChange?.(nextValue);
		close();
	};

	return {
		wrapperRef,
		isOpen,
		selectedValue,
		selectedOption,
		toggleOpen,
		close,
		selectValue,
	};
};
