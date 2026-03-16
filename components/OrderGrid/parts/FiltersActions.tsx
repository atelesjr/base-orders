import { UIButton } from '@/components/ui/Button';

type OrdersGridFiltersActionsProps = {
	onClear: () => void;
};

export const OrdersGridFiltersActions = ({
	onClear,
}: OrdersGridFiltersActionsProps) => {
	return (
		<div className="orders-grid__filters-actions">
			<UIButton className="orders-grid__filter-submit" type="submit">
				Aplicar
			</UIButton>
			<UIButton
				className="orders-grid__filter-clear"
				onClick={onClear}
				type="button"
			>
				Limpar
			</UIButton>
		</div>
	);
};
