import Image from 'next/image';
import type { ButtonHTMLAttributes } from 'react';
import './ButtonIcon.styles.css';

type ButtonIconVariant = 'primary' | 'secondary';
type IconPosition = 'left' | 'right';
type ButtonIconSize = 'sm' | 'md' | 'lg';

type ButtonIconBaseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	iconSrc: string;
	iconAlt?: string;
	variant?: ButtonIconVariant;
	iconPosition?: IconPosition;
	iconSize?: number;
	size?: ButtonIconSize;
};

type ButtonIconWithLabelProps = {
	label: string;
	'aria-label'?: string;
};

type ButtonIconIconOnlyProps = {
	label?: undefined;
	'aria-label': string;
};

export type ButtonIconProps = ButtonIconBaseProps &
	(ButtonIconWithLabelProps | ButtonIconIconOnlyProps);

const ButtonIcon = ({
	iconSrc,
	iconAlt = '',
	label,
	variant = 'primary',
	iconPosition = 'left',
	iconSize = 28,
	size = 'md',
	className,
	type = 'button',
	'aria-label': ariaLabel,
	...buttonProps
}: ButtonIconProps) => {
	const classes = [
		'ui-button-icon',
		`ui-button-icon--${variant}`,
		`ui-button-icon--${size}`,
		label ? 'ui-button-icon--with-label' : 'ui-button-icon--icon-only',
		className,
	]
		.filter(Boolean)
		.join(' ');

	const icon = (
		<Image
			alt={label ? '' : iconAlt}
			aria-hidden={label ? true : iconAlt ? undefined : true}
			height={iconSize}
			src={iconSrc}
			width={iconSize}
		/>
	);

	return (
		<button aria-label={ariaLabel} className={classes} type={type} {...buttonProps}>
			{iconPosition === 'left' ? icon : null}
			{label ? <span className="ui-button-icon__label">{label}</span> : null}
			{iconPosition === 'right' ? icon : null}
		</button>
	);
};

export default ButtonIcon;
