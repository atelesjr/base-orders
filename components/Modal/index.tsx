'use client';

import './Modal.styles.css';
import type { ReactNode } from 'react';
import { ModalBody } from './parts/Body';
import { ModalCloseButton } from './parts/CloseButton';
import { ModalContent } from './parts/Content';
import { ModalFooter } from './parts/Footer';
import { ModalHeader } from './parts/Header';
import { ModalOverlay } from './parts/Overlay';
import { ModalRoot } from './parts/Root';
import { ModalTitle } from './parts/Title';
import type { ModalRootProps } from './types';

type ModalCompoundComponent = ((props: ModalRootProps) => ReactNode) & {
	Root: typeof ModalRoot;
	Overlay: typeof ModalOverlay;
	Content: typeof ModalContent;
	Header: typeof ModalHeader;
	Title: typeof ModalTitle;
	Body: typeof ModalBody;
	Footer: typeof ModalFooter;
	CloseButton: typeof ModalCloseButton;
};

const Modal = ((props: ModalRootProps) => {
	return <ModalRoot {...props} />;
}) as ModalCompoundComponent;

Modal.Root = ModalRoot;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.CloseButton = ModalCloseButton;

export default Modal;
