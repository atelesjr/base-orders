import Link from 'next/link';
import type { OrdersGridHeadProps } from '../types';

export const OrdersGridHead = ({ columns, sortState }: OrdersGridHeadProps) => {
	return (
		<thead>
			<tr className="orders-grid__head-row">
				{columns.map((column) => {
					const sortHref =
						sortState && column.sortKey
							? sortState.sortLinks[column.sortKey]
							: undefined;
					const isActive = Boolean(
						sortState && column.sortKey && sortState.sortBy === column.sortKey,
					);
					const ariaSort = isActive
						? sortState?.sortDir === 'asc'
							? 'ascending'
							: 'descending'
						: 'none';

					return (
						<th aria-sort={ariaSort} className="orders-grid__th" key={column.key}>
							{sortHref && column.sortKey ? (
								<Link
									aria-label={`Ordenar por ${column.label}`}
									className={`orders-grid__sort-link${isActive ? ' orders-grid__sort-link--active' : ''}`}
									href={sortHref}
								>
									<span>{column.label}</span>
									<span aria-hidden="true" className="orders-grid__sort-indicator">
										{isActive ? (sortState?.sortDir === 'asc' ? '▲' : '▼') : '↕'}
									</span>
								</Link>
							) : (
								column.label
							)}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};
