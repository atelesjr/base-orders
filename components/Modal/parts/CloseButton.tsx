import { useModalContext } from '../context';
import type { ModalCloseButtonProps } from '../types';

export const ModalCloseButton = ({
	children = 'Close',
	className,
}: ModalCloseButtonProps) => {
	const { onOpenChange } = useModalContext();

	return (
		<button
			aria-label="Close modal"
			className={`modal__close-button ${className ?? ''}`.trim()}
			onClick={() => onOpenChange(false)}
			type="button"
		>
			{children}
		</button>
	);
};
