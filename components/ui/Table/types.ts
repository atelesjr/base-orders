import type { ReactNode } from 'react';

export type TableColumn<TData> = {
	key: string;
	label: string;
	width?: string;
	render: (row: TData) => ReactNode;
};

export type TableProps<TData> = {
	data: TData[];
	columns: TableColumn<TData>[];
	caption: string;
	emptyStateMessage?: string;
	onRowClick?: (row: TData) => void;
	getRowKey?: (row: TData, index: number) => string;
};

export type TableRootProps = {
	children: ReactNode;
};

export type TableWrapperProps = {
	children: ReactNode;
	caption: string;
};

export type TableHeadProps<TData> = {
	columns: TableColumn<TData>[];
};

export type TableBodyProps<TData> = {
	data: TData[];
	columns: TableColumn<TData>[];
	emptyStateMessage?: string;
	onRowClick?: (row: TData) => void;
	getRowKey?: (row: TData, index: number) => string;
};
