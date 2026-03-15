import { createContext, useContext } from 'react';

type ModalContextValue = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	closeOnOverlayClick: boolean;
	closeOnEsc: boolean;
	titleId: string;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ModalContext.Provider;

export const useModalContext = (): ModalContextValue => {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error('Modal compound components must be used within Modal.Root');
	}

	return context;
};
