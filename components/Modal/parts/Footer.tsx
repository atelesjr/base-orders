import type { ModalFooterProps } from '../types';

export const ModalFooter = ({ children, className }: ModalFooterProps) => (
	<footer className={`modal__footer ${className ?? ''}`.trim()}>{children}</footer>
);
