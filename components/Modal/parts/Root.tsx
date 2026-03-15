import { useId } from 'react';
import { ModalProvider } from '../context';
import { useBodyScrollLock } from '../hooks/use-body-scroll-lock';
import { useModalEscape } from '../hooks/use-modal-escape';
import type { ModalRootProps } from '../types';

export const ModalRoot = ({
	open,
	onOpenChange,
	children,
	closeOnOverlayClick = true,
	closeOnEsc = true,
	lockBodyScroll = false,
	className,
}: ModalRootProps) => {
	const titleId = useId();

	useModalEscape({
		open,
		enabled: closeOnEsc,
		onClose: () => onOpenChange(false),
	});

	useBodyScrollLock(open && lockBodyScroll);

	if (!open) {
		return null;
	}

	return (
		<ModalProvider
			value={{
				open,
				onOpenChange,
				closeOnOverlayClick,
				closeOnEsc,
				titleId,
			}}
		>
			<div className={`modal ${className ?? ''}`.trim()}>{children}</div>
		</ModalProvider>
	);
};
