import type { InputHTMLAttributes } from 'react';

type UITextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
	onChange: (nextValue: string) => void;
};

export const UITextInput = ({ onChange, ...inputProps }: UITextInputProps) => {
	return (
		<input
			{...inputProps}
			onChange={(event) => {
				onChange(event.target.value);
			}}
		/>
	);
};
