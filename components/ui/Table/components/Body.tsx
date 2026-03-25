import type { TableBodyProps } from '../types';

const resolveRowKey = <TData,>(
	row: TData,
	index: number,
	getRowKey?: (row: TData, index: number) => string,
) => {
	if (getRowKey) {
		return getRowKey(row, index);
	}

	const candidate = row as { id?: string | number };
	if (candidate.id !== undefined) {
		return String(candidate.id);
	}

	return String(index);
};

export const TableBody = <TData,>({
	data,
	columns,
	onRowClick,
	emptyStateMessage = 'Nenhum resultado encontrado.',
	getRowKey,
}: TableBodyProps<TData>) => {
	return (
		<tbody>
			{data.length === 0 ? (
				<tr className="ui-table__row">
					<td className="ui-table__empty-state" colSpan={columns.length}>
						{emptyStateMessage}
					</td>
				</tr>
			) : null}

			{data.map((row, index) => {
				const rowKey = resolveRowKey(row, index, getRowKey);
				const rowClassName = `ui-table__row${onRowClick ? ' ui-table__row--clickable' : ''}`;

				return (
					<tr
						className={rowClassName}
						key={rowKey}
						onClick={onRowClick ? () => onRowClick(row) : undefined}
						onKeyDown={
							onRowClick
								? (event) => {
										if (event.key === 'Enter' || event.key === ' ') {
											event.preventDefault();
											onRowClick(row);
										}
								  }
								: undefined
						}
						tabIndex={onRowClick ? 0 : undefined}
					>
						{columns.map((column) => (
							<td className="ui-table__td" key={`${rowKey}-${column.key}`}>
								{column.render(row)}
							</td>
						))}
					</tr>
				);
			})}
		</tbody>
	);
};
