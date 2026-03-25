import type { TableHeadProps } from '../types';

export const TableHead = <TData,>({ columns }: TableHeadProps<TData>) => {
	return (
		<thead>
			<tr className="ui-table__head-row">
				{columns.map((column) => (
					<th className="ui-table__th" key={column.key} scope="col">
						{column.label}
					</th>
				))}
			</tr>
		</thead>
	);
};
