import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.styles.css';

type ButtonVariant = 'primary';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	variant?: ButtonVariant;
};

const Button = ({
	children,
	className,
	variant = 'primary',
	type = 'button',
	...buttonProps
}: ButtonProps) => {
	const classes = ['ui-button', `ui-button--${variant}`, className]
		.filter(Boolean)
		.join(' ');

	return (
		<button className={classes} type={type} {...buttonProps}>
			{children}
		</button>
	);
};

export default Button;
