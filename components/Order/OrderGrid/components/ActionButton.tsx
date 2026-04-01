import ButtonIcon from '@/components/ui/buttons/ButtonIcon';

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
		<ButtonIcon
			aria-label={label}
			aria-pressed={isActive}
			className={`orders-grid__action-button ${
				isActive ? 'orders-grid__action-button--active' : ''
			}`.trim()}
			iconAlt={iconAlt}
			iconSrc={iconSrc}
			label={label}
			onClick={onClick}
			variant="secondary"
			type="button"
		/>
	);
};
