import { useModalContext } from '../context';
import type { ModalOverlayProps } from '../types';

export const ModalOverlay = ({ className }: ModalOverlayProps) => {
	const { closeOnOverlayClick, onOpenChange } = useModalContext();

	const handleClick = () => {
		if (closeOnOverlayClick) {
			onOpenChange(false);
		}
	};

	return (
		<div
			aria-hidden="true"
			className={`modal__overlay ${className ?? ''}`.trim()}
			onClick={handleClick}
		/>
	);
};
