import Image from 'next/image';

type OrdersGridActionButtonProps = {
	label: string;
	iconAlt: string;
	iconSrc: string;
	onClick?: () => void;
};

export const OrdersGridActionButton = ({
	label,
	iconAlt,
	iconSrc,
	onClick,
}: OrdersGridActionButtonProps) => {
	return (
		<button
			aria-label={label}
			className="orders-grid__action-button"
			onClick={onClick}
			type="button"
		>
			<Image alt={iconAlt} height={28} src={iconSrc} width={28} />
			<span className="orders-grid__action-label">{label}</span>
		</button>
	);
};
