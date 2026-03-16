import type { ReactNode } from 'react';

type UIFormFieldProps = {
	id: string;
	label: string;
	className?: string;
	children: ReactNode;
};

export const UIFormField = ({ id, label, className, children }: UIFormFieldProps) => {
	return (
		<label className={className} htmlFor={id}>
			<span>{label}</span>
			{children}
		</label>
	);
};
