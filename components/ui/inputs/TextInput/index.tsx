import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import './TextInput.styles.css';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
	invalid?: boolean;
	label?: string;
	errorMessage?: string;
	onValueChange?: (nextValue: string) => void;
};

const TextInput = ({
	className,
	errorMessage,
	id,
	invalid = false,
	label,
	onChange,
	onValueChange,
	type = 'text',
	...inputProps
}: TextInputProps) => {
	const generatedId = useId();
	const inputId = id ?? `text-input-${generatedId}`;
	const errorId = errorMessage ? `${inputId}-error` : undefined;

	const classes = [
		'ui-text-input__input',
		invalid ? 'ui-text-input--invalid' : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className="ui-text-input">
			{label ? (
				<label className="ui-text-input__label" htmlFor={inputId}>
					{label}
				</label>
			) : null}

			<input
				id={inputId}
				aria-describedby={errorId}
				aria-invalid={invalid ? true : undefined}
				className={classes}
				type={type}
				onChange={(event) => {
					onChange?.(event);
					onValueChange?.(event.target.value);
				}}
				{...inputProps}
			/>

			{errorMessage ? (
				<p className="ui-text-input__error" id={errorId} role="alert">
					{errorMessage}
				</p>
			) : null}
		</div>
	);
};

export default TextInput;
