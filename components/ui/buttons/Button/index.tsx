import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.styles.css';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
};

const Button = ({
	children,
	className,
	variant = 'primary',
	size = 'md',
	type = 'button',
	...buttonProps
}: ButtonProps) => {
	const classes = ['ui-button', `ui-button--${variant}`, `ui-button--${size}`, className]
		.filter(Boolean)
		.join(' ');

	return (
		<button className={classes} type={type} {...buttonProps}>
			{children}
		</button>
	);
};

export default Button;
