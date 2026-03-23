import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import './RadioInput.styles.css';

export type RadioOption = {
	label: string;
	value: string;
	disabled?: boolean;
};

export type RadioInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type' | 'value' | 'defaultValue' | 'onChange'
> & {
	name: string;
	options: RadioOption[];
	value?: string;
	defaultValue?: string;
	invalid?: boolean;
	label?: string;
	errorMessage?: string;
	'aria-label'?: string;
	onChange?: (nextValue: string) => void;
	onValueChange?: (nextValue: string) => void;
};

const RadioInput = ({
	className,
	defaultValue,
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
	...inputProps
}: RadioInputProps) => {
	const generatedId = useId();
	const baseId = id ?? `radio-input-${generatedId}`;
	const errorId = errorMessage ? `${baseId}-error` : undefined;

	return (
		<div className={["ui-radio-input", className].filter(Boolean).join(' ')}>
			{label ? <p className="ui-radio-input__label">{label}</p> : null}

			<div
				aria-describedby={errorId}
				aria-invalid={invalid ? true : undefined}
				aria-label={ariaLabel}
				role="radiogroup"
			>
				{options.map((option) => {
					const optionId = `${baseId}-${option.value}`;
					const optionClassName = [
						'ui-radio-input__option',
						invalid ? 'ui-radio-input__option--invalid' : '',
					]
						.filter(Boolean)
						.join(' ');

					return (
						<label className={optionClassName} htmlFor={optionId} key={option.value}>
							<input
								{...inputProps}
								checked={value !== undefined ? value === option.value : undefined}
								defaultChecked={
									value === undefined ? defaultValue === option.value : undefined
								}
								disabled={disabled || option.disabled}
								id={optionId}
								name={name}
								onChange={(event) => {
									if (!event.target.checked) {
										return;
									}
									onChange?.(event.target.value);
									onValueChange?.(event.target.value);
								}}
								type="radio"
								value={option.value}
							/>
							<span>{option.label}</span>
						</label>
					);
				})}
			</div>

			{errorMessage ? (
				<p className="ui-radio-input__error" id={errorId} role="alert">
					{errorMessage}
				</p>
			) : null}
		</div>
	);
};

export default RadioInput;
