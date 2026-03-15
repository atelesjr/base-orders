import type { HTMLAttributes, ReactNode } from 'react';

export type ModalRootProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
	closeOnOverlayClick?: boolean;
	closeOnEsc?: boolean;
	className?: string;
};

export type ModalOverlayProps = {
	className?: string;
};

export type ModalContentProps = HTMLAttributes<HTMLDivElement>;

export type ModalHeaderProps = {
	children: ReactNode;
	className?: string;
};

export type ModalTitleProps = {
	children: ReactNode;
	className?: string;
};

export type ModalBodyProps = {
	children: ReactNode;
	className?: string;
};

export type ModalFooterProps = {
	children: ReactNode;
	className?: string;
};

export type ModalCloseButtonProps = {
	children?: ReactNode;
	className?: string;
};
