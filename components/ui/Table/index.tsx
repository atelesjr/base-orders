import type { ReactNode } from 'react';
import './Table.styles.css';
import { TableBody } from './components/Body';
import { TableHead } from './components/Head';
import { TableRoot } from './components/Root';
import { TableWrapper } from './components/Table';
import type {
	TableBodyProps,
	TableColumn,
	TableHeadProps,
	TableProps,
	TableRootProps,
	TableWrapperProps,
} from './types';

type TableCompoundComponent = (<TData>(props: TableProps<TData>) => ReactNode) & {
	Root: (props: TableRootProps) => ReactNode;
	Table: (props: TableWrapperProps) => ReactNode;
	Head: <TData>(props: TableHeadProps<TData>) => ReactNode;
	Body: <TData>(props: TableBodyProps<TData>) => ReactNode;
};

const Table = (({
	data,
	columns,
	caption,
	emptyStateMessage,
	onRowClick,
	getRowKey,
}: TableProps<unknown>) => {
	return (
		<TableRoot>
			<TableWrapper caption={caption}>
				<colgroup>
					{columns.map((column) => (
						<col key={column.key} style={{ width: column.width ?? 'auto' }} />
					))}
				</colgroup>
				<TableHead columns={columns} />
				<TableBody
					columns={columns}
					data={data}
					emptyStateMessage={emptyStateMessage}
					getRowKey={getRowKey}
					onRowClick={onRowClick}
				/>
			</TableWrapper>
		</TableRoot>
	);
}) as TableCompoundComponent;

Table.Root = TableRoot;
Table.Table = TableWrapper;
Table.Head = TableHead;
Table.Body = TableBody;

export type { TableColumn, TableProps };
export default Table;
