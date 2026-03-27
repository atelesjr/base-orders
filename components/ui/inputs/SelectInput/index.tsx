import type { JSX } from 'react';
import './SelectInput.styles.css';
import type {
	SelectInputPartProps,
	SelectInputProps,
	SelectInputRootProps,
	SelectOption,
} from './select-input.types';
import { SelectInputError } from './components/SelectInputError';
import { SelectInputLabel } from './components/SelectInputLabel';
import { SelectInputMenu } from './components/SelectInputMenu';
import { SelectInputRoot } from './components/SelectInputRoot';
import { SelectInputTrigger } from './components/SelectInputTrigger';

type SelectInputCompoundComponent = ((
	props: SelectInputProps,
) => JSX.Element) & {
	Root: typeof SelectInputRoot;
	Label: typeof SelectInputLabel;
	Trigger: typeof SelectInputTrigger;
	Menu: typeof SelectInputMenu;
	Error: typeof SelectInputError;
};

const SelectInput = ((props: SelectInputProps) => {
	return <SelectInputRoot {...props} />;
}) as SelectInputCompoundComponent;

SelectInput.Root = SelectInputRoot;
SelectInput.Label = SelectInputLabel;
SelectInput.Trigger = SelectInputTrigger;
SelectInput.Menu = SelectInputMenu;
SelectInput.Error = SelectInputError;

export default SelectInput;
export type {
	SelectInputProps,
	SelectInputRootProps,
	SelectInputPartProps,
	SelectOption,
};
