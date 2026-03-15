'use client';

import Image from 'next/image';
import Modal from '@/components/Modal';
import { formatTimestampBR } from '@/lib/orders/orders.formatters';
import type { Order } from '@/lib/orders/orders.types';
import './OrderDetailsModal.styles.css';

type OrderDetailsModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	order: Order | null;
};

const OrderDetailsModal = ({
	open,
	onOpenChange,
	order,
}: OrderDetailsModalProps) => {
	const isOpen = open && Boolean(order);

	if (!order) {
		return null;
	}

	return (
		<Modal.Root open={isOpen} onOpenChange={onOpenChange}>
			<Modal.Overlay />
			<Modal.Content>
				<Modal.Header>
					<Modal.Title>
						Ordem #{order.id} - {order.instrument}
					</Modal.Title>
					<Modal.CloseButton>
						<Image
							src="/assets/cancel_60dp.svg"
							alt="Fechar modal"
							width={24}
							height={24}
						/>
					</Modal.CloseButton>
				</Modal.Header>

				<Modal.Body>
					<section className="order-details-modal__summary">
						<div className="order-details-modal__item">
							<strong className="order-details-modal__label">
								Instrumento
							</strong>
							<p className="order-details-modal__value">{order.instrument}</p>
						</div>
						<div className="order-details-modal__item">
							<strong className="order-details-modal__label">Lado</strong>
							<p className="order-details-modal__value">{order.side}</p>
						</div>
						<div className="order-details-modal__item">
							<strong className="order-details-modal__label">Preço</strong>
							<p className="order-details-modal__value">{order.price}</p>
						</div>
						<div className="order-details-modal__item">
							<strong className="order-details-modal__label">Quantidade</strong>
							<p className="order-details-modal__value">{order.quantity}</p>
						</div>
						<div className="order-details-modal__item">
							<strong className="order-details-modal__label">
								Qtd Restante
							</strong>
							<p className="order-details-modal__value">
								{order.remainingQuantity}
							</p>
						</div>
						<div className="order-details-modal__item">
							<strong className="order-details-modal__label">
								Status Atual
							</strong>
							<p className="order-details-modal__value">{order.status}</p>
						</div>
						<div className="order-details-modal__item md:col-span-2">
							<strong className="order-details-modal__label">Criada em</strong>
							<p className="order-details-modal__value">
								{formatTimestampBR(order.timestamp)}
							</p>
						</div>
					</section>

					<section>
						<h3 className="order-details-modal__section-title">
							Histórico de status
						</h3>
						<ul className="order-details-modal__history-list">
							{order.statusHistory.map((item, index) => (
								<li
									className="order-details-modal__history-item"
									key={`${item.status}-${item.updatedAt}-${index}`}
								>
									<p className="order-details-modal__history-status">
										{item.status}
									</p>
									<p className="order-details-modal__history-date">
										{formatTimestampBR(item.updatedAt)}
									</p>
								</li>
							))}
						</ul>
					</section>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
};

export default OrderDetailsModal;
