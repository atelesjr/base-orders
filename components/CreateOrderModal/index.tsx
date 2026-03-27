'use client';


import Modal from '@/components/Modal';
import TextInput from '@/components/ui/inputs/TextInput';
import RadioInput from '@/components/ui/inputs/RadioInput';
import Button from '@/components/ui/buttons/Button';
import './CreateOrderModal.styles.css';
import { useCreateOrderForm } from './useCreateOrderForm';

type CreateOrderModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreated?: () => void;
};




const CreateOrderModal = ({ open, onOpenChange, onCreated }: CreateOrderModalProps) => {
	const {
		watch,
		setValue,
		errors,
		isSubmitting,
		closeModal,
		onSubmit,
	} = useCreateOrderForm({
		onCreated,
		onClose: () => onOpenChange(false),
	});

	const instrumentValue = watch('instrument');
	const sideValue = watch('side');
	const priceValue = watch('price');
	const quantityValue = watch('quantity');

		return (
			<Modal.Root open={open} onOpenChange={onOpenChange}>
				<Modal.Overlay />
				<Modal.Content>
					<Modal.Header>
						<Modal.Title>Criar ordem</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<form
							className="create-order-modal__form"
							id="create-order-form"
							onSubmit={onSubmit}
						>
							<div className="create-order-modal__field">
								<TextInput
									id="create-order-instrument"
									label="Instrumento"
									errorMessage={errors.instrument?.message}
									value={instrumentValue}
									onValueChange={(nextValue) => {
										setValue('instrument', nextValue.toUpperCase(), {
											shouldDirty: true,
										});
									}}
								/>
							</div>

							<div className="create-order-modal__field">
								<RadioInput
									aria-label="Lado"
									label="Lado"
									name="create-order-side"
									errorMessage={errors.side?.message}
									options={[
										{ label: 'Compra', value: 'Compra' },
										{ label: 'Venda', value: 'Venda' },
									]}
									value={sideValue}
									onValueChange={(nextValue) => {
										// Type-safe assignment for side
										setValue(
											'side',
											nextValue === 'Compra' || nextValue === 'Venda' ? nextValue : 'Compra',
											{ shouldDirty: true }
										);
									}}
								/>
							</div>

							<div className="create-order-modal__field">
								<TextInput
									id="create-order-price"
									label="Preço"
									errorMessage={errors.price?.message}
									step="any"
									type="number"
									value={priceValue}
									onValueChange={(nextValue) => {
										setValue('price', Number(nextValue), { shouldDirty: true });
									}}
								/>
							</div>

							<div className="create-order-modal__field">
								<TextInput
									id="create-order-quantity"
									label="Quantidade"
									errorMessage={errors.quantity?.message}
									step="any"
									type="number"
									value={quantityValue}
									onValueChange={(nextValue) => {
										setValue('quantity', Number(nextValue), {
											shouldDirty: true,
										});
									}}
								/>
							</div>

							<p className="create-order-modal__status-note ui-text-input__label">
								Status inicial: <span className="font-normal">Aberta</span>
							</p>

							{errors.root ? (
								<p className="create-order-modal__root-error">
									{errors.root.message}
								</p>
							) : null}
						</form>
					</Modal.Body>

					<Modal.Footer>
						<div className="create-order-modal__submit-button">
							<Button
								disabled={isSubmitting}
								form="create-order-form"
								type="submit"
								width="full"
								variant="primary"
							>
								Criar
							</Button>
						</div>
						<div className="create-order-modal__cancel-button">
							<Button width="full" variant="secondary" onClick={closeModal}>
								Cancelar
							</Button>
						</div>
					</Modal.Footer>
				</Modal.Content>
			</Modal.Root>
		);
};

export default CreateOrderModal;
