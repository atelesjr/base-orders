import Image from 'next/image';
import Link from 'next/link';
import type { OrdersGridPaginationProps } from '../types';

export const OrdersGridPagination = ({
	pagination,
	className = '',
}: OrdersGridPaginationProps) => {
	const { currentPage, totalPages, prevHref, nextHref } = pagination;

	return (
		<div
			className={`orders-grid__pagination ${className}`.trim()}
			role="navigation"
			aria-label="Paginacao da tabela"
		>
			{prevHref ? (
				<Link className="orders-grid__page-button" href={prevHref} aria-label="Pagina anterior">
					<Image
						src="/assets/arrow_circle_left_60dp.svg"
						alt="Pagina anterior"
						width={28}
						height={28}
					/>
				</Link>
			) : (
				<span className="orders-grid__page-button orders-grid__page-button--disabled" aria-hidden="true">
					<Image
						src="/assets/arrow_circle_left_60dp.svg"
						alt=""
						width={28}
						height={28}
					/>
				</span>
			)}

			<p className="orders-grid__page-indicator">
				{currentPage} de {totalPages}
			</p>

			{nextHref ? (
				<Link className="orders-grid__page-button" href={nextHref} aria-label="Proxima pagina">
					<Image
						src="/assets/arrow_circle_right_60dp.svg"
						alt="Proxima pagina"
						width={28}
						height={28}
					/>
				</Link>
			) : (
				<span className="orders-grid__page-button orders-grid__page-button--disabled" aria-hidden="true">
					<Image
						src="/assets/arrow_circle_right_60dp.svg"
						alt=""
						width={28}
						height={28}
					/>
				</span>
			)}
		</div>
	);
};
