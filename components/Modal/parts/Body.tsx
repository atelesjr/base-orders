import type { ModalBodyProps } from '../types';

export const ModalBody = ({ children, className }: ModalBodyProps) => (
	<div className={`modal__body ${className ?? ''}`.trim()}>{children}</div>
);
