import { useEffect, useRef } from 'react';
import { useModalContext } from '../context';
import type { ModalContentProps } from '../types';

export const ModalContent = ({
	children,
	className,
	onClick,
	...props
}: ModalContentProps) => {
	const { titleId } = useModalContext();
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		contentRef.current?.focus();
	}, []);

	return (
		<div className="modal__container" onClick={(event) => event.stopPropagation()}>
			<div
				{...props}
				aria-labelledby={titleId}
				aria-modal="true"
				className={`modal__content ${className ?? ''}`.trim()}
				onClick={onClick}
				ref={contentRef}
				role="dialog"
				tabIndex={-1}
			>
				{children}
			</div>
		</div>
	);
};
