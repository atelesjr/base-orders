import Button from '@/components/ui/buttons/Button';

type OrdersGridFiltersActionsProps = {
	onClear: () => void;
};

export const OrdersGridFiltersActions = ({
	onClear,
}: OrdersGridFiltersActionsProps) => {
	return (
		<div className="orders-grid__filters-actions">
			<Button className="orders-grid__filter-submit" type="submit">
				Aplicar
			</Button>
			<Button
				className="orders-grid__filter-clear"
				onClick={onClear}
				type="button"
			>
				Limpar
			</Button>
		</div>
	);
};
