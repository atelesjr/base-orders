import type { TableRootProps } from '../types';

export const TableRoot = ({ children }: TableRootProps) => {
	return <section className="ui-table">{children}</section>;
};
