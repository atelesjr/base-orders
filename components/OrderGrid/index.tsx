import './OrderGrid.styles.css';
import type { ReactNode } from 'react';
import { defaultColumns } from './columns';
import { OrdersGridBody } from './parts/Body';
import { OrdersGridHead } from './parts/Head';
import { OrdersGridRoot } from './parts/Root';
import { OrdersGridTable } from './parts/Table';
import type { OrdersGridColumn, OrdersGridProps } from './types';

type OrdersGridCompoundComponent = ((props: OrdersGridProps) => ReactNode) & {
	Root: typeof OrdersGridRoot;
	Table: typeof OrdersGridTable;
	Head: typeof OrdersGridHead;
	Body: typeof OrdersGridBody;
	defaultColumns: OrdersGridColumn[];
};

const OrdersGrid = (({ orders, columns = defaultColumns }: OrdersGridProps) => {
	return (
		<OrdersGridRoot>
			<OrdersGridTable>
				<colgroup>
					{columns.map((column) => (
						<col key={column.key} style={{ width: column.width ?? 'auto' }} />
					))}
				</colgroup>
				<OrdersGridHead columns={columns} />
				<OrdersGridBody columns={columns} orders={orders} />
			</OrdersGridTable>
		</OrdersGridRoot>
	);
}) as OrdersGridCompoundComponent;

OrdersGrid.Root = OrdersGridRoot;
OrdersGrid.Table = OrdersGridTable;
OrdersGrid.Head = OrdersGridHead;
OrdersGrid.Body = OrdersGridBody;
OrdersGrid.defaultColumns = defaultColumns;

export default OrdersGrid;
