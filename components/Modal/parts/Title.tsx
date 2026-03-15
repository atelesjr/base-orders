import { useModalContext } from '../context';
import type { ModalTitleProps } from '../types';

export const ModalTitle = ({ children, className }: ModalTitleProps) => {
	const { titleId } = useModalContext();

	return (
		<h2 className={`modal__title ${className ?? ''}`.trim()} id={titleId}>
			{children}
		</h2>
	);
};
