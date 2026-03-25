import './OrderGrid.styles.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Table, { type TableColumn } from '@/components/ui/Table';
import { defaultColumns } from './columns';
import { OrdersGridRoot } from './parts/Root';
import type { OrdersGridColumn, OrdersGridProps } from './types';

type OrdersGridCompoundComponent = ((props: OrdersGridProps) => ReactNode) & {
	Root: typeof OrdersGridRoot;
	Table: typeof Table.Table;
	Head: typeof Table.Head;
	Body: typeof Table.Body;
	defaultColumns: OrdersGridColumn[];
};

const mapColumnsToTable = (
	columns: OrdersGridColumn[],
	sortState?: OrdersGridProps['sortState'],
): TableColumn<OrdersGridProps['orders'][number]>[] => {
	return columns.map((column) => {
		const sortHref =
			sortState && column.sortKey ? sortState.sortLinks[column.sortKey] : undefined;
		const isActive = Boolean(
			sortState && column.sortKey && sortState.sortBy === column.sortKey,
		);

		const label = sortHref && column.sortKey
			? (
				<Link
					aria-label={`Ordenar por ${column.label}`}
					className={`orders-grid__sort-link${isActive ? ' orders-grid__sort-link--active' : ''}`}
					href={sortHref}
				>
					<span>{column.label}</span>
					<span aria-hidden="true" className="orders-grid__sort-indicator">
						{isActive
							? sortState?.sortDir === 'asc'
								? '▲'
								: '▼'
							: '↕'}
					</span>
				</Link>
			)
			: column.label;

		return {
			key: column.key,
			label,
			width: column.width,
			render: column.render,
		};
	});
};

const OrdersGrid = (({
	orders,
	columns = defaultColumns,
	onRowClick,
	sortState,
	emptyStateMessage,
}: OrdersGridProps) => {
	const tableColumns = mapColumnsToTable(columns, sortState);

	return (
		<OrdersGridRoot>
			<Table
				caption="Ordens"
				columns={tableColumns}
				data={orders}
				emptyStateMessage={emptyStateMessage ?? 'Nenhuma ordem encontrada.'}
				getRowKey={(order) => order.id}
				onRowClick={onRowClick}
			/>
		</OrdersGridRoot>
	);
}) as OrdersGridCompoundComponent;

OrdersGrid.Root = OrdersGridRoot;
OrdersGrid.Table = Table.Table;
OrdersGrid.Head = Table.Head;
OrdersGrid.Body = Table.Body;
OrdersGrid.defaultColumns = defaultColumns;

export default OrdersGrid;
