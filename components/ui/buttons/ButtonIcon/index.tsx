import Image from 'next/image';
import type { ButtonHTMLAttributes } from 'react';
import './ButtonIcon.styles.css';

type ButtonIconVariant = 'primary' | 'secondary';
type IconPosition = 'left' | 'right';

export type ButtonIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	iconSrc: string;
	iconAlt?: string;
	label?: string;
	variant?: ButtonIconVariant;
	iconPosition?: IconPosition;
	iconSize?: number;
};

const ButtonIcon = ({
	iconSrc,
	iconAlt = '',
	label,
	variant = 'primary',
	iconPosition = 'left',
	iconSize = 28,
	className,
	type = 'button',
	...buttonProps
}: ButtonIconProps) => {
	const classes = [
		'ui-button-icon',
		`ui-button-icon--${variant}`,
		label ? 'ui-button-icon--with-label' : 'ui-button-icon--icon-only',
		className,
	]
		.filter(Boolean)
		.join(' ');

	const icon = (
		<Image
			alt={iconAlt}
			aria-hidden={iconAlt ? undefined : true}
			height={iconSize}
			src={iconSrc}
			width={iconSize}
		/>
	);

	return (
		<button className={classes} type={type} {...buttonProps}>
			{iconPosition === 'left' ? icon : null}
			{label ? <span className="ui-button-icon__label">{label}</span> : null}
			{iconPosition === 'right' ? icon : null}
		</button>
	);
};

export default ButtonIcon;
