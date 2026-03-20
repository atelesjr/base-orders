'use client';

import { useForm } from 'react-hook-form';
import Modal from '@/components/Modal';
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

const CreateOrderModal = ({
	open,
	onOpenChange,
	onCreated,
}: CreateOrderModalProps) => {
	const {
		register,
		handleSubmit,
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
		},
	});

	const instrumentField = register('instrument');

	const closeModal = () => {
		reset({
			instrument: '',
			side: 'Compra',
			price: 0,
			quantity: 0,
		});
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
						<label
							className="create-order-modal__field"
							htmlFor="create-order-instrument"
						>
							<span>Instrumento</span>
							<input
								id="create-order-instrument"
								type="text"
								{...instrumentField}
								onChange={(event) => {
									event.target.value = event.target.value.toUpperCase();
									instrumentField.onChange(event);
								}}
							/>
							{errors.instrument ? (
								<span className="create-order-modal__error">
									{errors.instrument.message}
								</span>
							) : null}
						</label>

						<label
							className="create-order-modal__field"
							htmlFor="create-order-side"
						>
							<span>Lado</span>
							<select id="create-order-side" {...register('side')}>
								<option value="Compra">Compra</option>
								<option value="Venda">Venda</option>
							</select>
							{errors.side ? (
								<span className="create-order-modal__error">
									{errors.side.message}
								</span>
							) : null}
						</label>

						<label
							className="create-order-modal__field"
							htmlFor="create-order-price"
						>
							<span>Preco</span>
							<input
								id="create-order-price"
								type="number"
								step="any"
								{...register('price', { valueAsNumber: true })}
							/>
							{errors.price ? (
								<span className="create-order-modal__error">
									{errors.price.message}
								</span>
							) : null}
						</label>

						<label
							className="create-order-modal__field"
							htmlFor="create-order-quantity"
						>
							<span>Quantidade</span>
							<input
								id="create-order-quantity"
								type="number"
								step="any"
								{...register('quantity', { valueAsNumber: true })}
							/>
							{errors.quantity ? (
								<span className="create-order-modal__error">
									{errors.quantity.message}
								</span>
							) : null}
						</label>

						<p className="create-order-modal__status-note">
							Status inicial: Aberta
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
							variant="primary"
						>
							Criar
						</Button>
					</div>
					<div className="create-order-modal__cancel-button">
						<Button variant="secondary" onClick={closeModal}>
							Cancelar
						</Button>
					</div>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};

export default CreateOrderModal;
