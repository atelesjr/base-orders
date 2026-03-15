import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '../index';

describe('Modal', () => {
	it('does not render when open is false', () => {
		render(
			<Modal.Root open={false} onOpenChange={jest.fn()}>
				<Modal.Overlay />
				<Modal.Content>Content</Modal.Content>
			</Modal.Root>,
		);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('renders dialog content when open is true', () => {
		render(
			<Modal.Root open onOpenChange={jest.fn()}>
				<Modal.Overlay />
				<Modal.Content>
					<Modal.Header>
						<Modal.Title>Modal Title</Modal.Title>
					</Modal.Header>
					<Modal.Body>Body Content</Modal.Body>
				</Modal.Content>
			</Modal.Root>,
		);

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText('Modal Title')).toBeInTheDocument();
		expect(screen.getByText('Body Content')).toBeInTheDocument();
	});

	it('calls onOpenChange(false) when close button is clicked', () => {
		const onOpenChange = jest.fn();

		render(
			<Modal.Root open onOpenChange={onOpenChange}>
				<Modal.Overlay />
				<Modal.Content>
					<Modal.CloseButton />
				</Modal.Content>
			</Modal.Root>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));

		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it('calls onOpenChange(false) when overlay is clicked', () => {
		const onOpenChange = jest.fn();
		const { container } = render(
			<Modal.Root open onOpenChange={onOpenChange}>
				<Modal.Overlay />
				<Modal.Content>Content</Modal.Content>
			</Modal.Root>,
		);

		const overlay = container.querySelector('.modal__overlay');
		expect(overlay).toBeTruthy();

		fireEvent.click(overlay as Element);

		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it('does not close on overlay click when closeOnOverlayClick is false', () => {
		const onOpenChange = jest.fn();
		const { container } = render(
			<Modal.Root open onOpenChange={onOpenChange} closeOnOverlayClick={false}>
				<Modal.Overlay />
				<Modal.Content>Content</Modal.Content>
			</Modal.Root>,
		);

		const overlay = container.querySelector('.modal__overlay');
		expect(overlay).toBeTruthy();

		fireEvent.click(overlay as Element);

		expect(onOpenChange).not.toHaveBeenCalled();
	});

	it('closes on Escape key when closeOnEsc is true', () => {
		const onOpenChange = jest.fn();

		render(
			<Modal.Root open onOpenChange={onOpenChange}>
				<Modal.Overlay />
				<Modal.Content>Content</Modal.Content>
			</Modal.Root>,
		);

		fireEvent.keyDown(document, { key: 'Escape' });

		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it('does not close on Escape key when closeOnEsc is false', () => {
		const onOpenChange = jest.fn();

		render(
			<Modal.Root open onOpenChange={onOpenChange} closeOnEsc={false}>
				<Modal.Overlay />
				<Modal.Content>Content</Modal.Content>
			</Modal.Root>,
		);

		fireEvent.keyDown(document, { key: 'Escape' });

		expect(onOpenChange).not.toHaveBeenCalled();
	});
});
