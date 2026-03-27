import type { ReactNode } from 'react';

export type SelectOption = {
	label: string;
	value: string;
	disabled?: boolean;
};

export type SelectInputProps = {
	id?: string;
	name?: string;
	value?: string;
	defaultValue?: string;
	disabled?: boolean;
	className?: string;
	'aria-label'?: string;
	options: SelectOption[];
	invalid?: boolean;
	label?: string;
	errorMessage?: string;
	onChange?: (nextValue: string) => void;
	onValueChange?: (nextValue: string) => void;
};

export type SelectInputRootProps = SelectInputProps & {
	children?: ReactNode;
};

export type SelectInputPartProps = {
	className?: string;
	children?: ReactNode;
};
