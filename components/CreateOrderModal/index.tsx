'use client';

import { useForm } from 'react-hook-form';
import Modal from '@/components/Modal';
import TextInput from '@/components/ui/inputs/TextInput';
import RadioInput from '@/components/ui/inputs/RadioInput';
import {
	createOrderSchema,
	type CreateOrderInput,
} from '@/lib/orders/create-order.schema';
import Button from '@/components/ui/buttons/Button';
import './CreateOrderModal.styles.css';

type CreateOrderModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreated?: () => void;
};



type CreateOrderFormDefaults = Omit<CreateOrderInput, 'side'> & { side: CreateOrderInput['side'] };

const CreateOrderModal = ({
	open,
	onOpenChange,
	onCreated,
}: CreateOrderModalProps) => {
	const {
		watch,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CreateOrderInput>({
		defaultValues: {
			instrument: '',
			side: 'Compra',
			price: 0,
			quantity: 0,
		} as CreateOrderFormDefaults,
	});


	const instrumentValue = watch('instrument');
	const sideValue = watch('side');
	const priceValue = watch('price');
	const quantityValue = watch('quantity');


	const closeModal = () => {
		reset({
			instrument: '',
			side: 'Compra',
			price: 0,
			quantity: 0,
		} as CreateOrderFormDefaults);
		onOpenChange(false);
	};

	const onSubmit = handleSubmit(async (values) => {
		clearErrors();
		const parsed = createOrderSchema.safeParse(values);

		if (!parsed.success) {
			parsed.error.issues.forEach((issue) => {
				const fieldName = issue.path[0];
				if (
					fieldName === 'instrument' ||
					fieldName === 'side' ||
					fieldName === 'price' ||
					fieldName === 'quantity'
				) {
					setError(fieldName, { message: issue.message });
				}
			});
			return;
		}

		const response = await fetch('/api/orders', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(parsed.data),
		});

		if (!response.ok) {
			setError('root', {
				message: 'Nao foi possivel criar a ordem. Tente novamente.',
			});
			return;
		}

		closeModal();
		onCreated?.();
	});

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
										setValue('side', nextValue as CreateOrderInput['side'], {
											shouldDirty: true,
										});
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
