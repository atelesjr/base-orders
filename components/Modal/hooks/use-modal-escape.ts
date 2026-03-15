import { useEffect } from 'react';

type UseModalEscapeParams = {
	open: boolean;
	enabled: boolean;
	onClose: () => void;
};

export const useModalEscape = ({
	open,
	enabled,
	onClose,
}: UseModalEscapeParams) => {
	useEffect(() => {
		if (!open || !enabled) {
			return;
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [open, enabled, onClose]);
};
