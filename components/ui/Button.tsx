import type { ButtonHTMLAttributes, ReactNode } from 'react';

type UIButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
};

export const UIButton = ({ children, className, ...buttonProps }: UIButtonProps) => {
	return (
		<button className={className} {...buttonProps}>
			{children}
		</button>
	);
};
