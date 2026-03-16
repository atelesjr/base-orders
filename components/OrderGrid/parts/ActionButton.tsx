import Image from 'next/image';

type OrdersGridActionButtonProps = {
	label: string;
	iconAlt: string;
	iconSrc: string;
	onClick?: () => void;
	isActive?: boolean;
};

export const OrdersGridActionButton = ({
	label,
	iconAlt,
	iconSrc,
	onClick,
	isActive = false,
}: OrdersGridActionButtonProps) => {
	return (
		<button
			aria-label={label}
			aria-pressed={isActive}
			className={`orders-grid__action-button ${
				isActive ? 'orders-grid__action-button--active' : ''
			}`.trim()}
			onClick={onClick}
			type="button"
		>
			<Image alt={iconAlt} height={28} src={iconSrc} width={28} />
			<span className="orders-grid__action-label">{label}</span>
		</button>
	);
};
