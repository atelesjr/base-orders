import type { ModalHeaderProps } from '../types';

export const ModalHeader = ({ children, className }: ModalHeaderProps) => (
	<header className={`modal__header ${className ?? ''}`.trim()}>{children}</header>
);
