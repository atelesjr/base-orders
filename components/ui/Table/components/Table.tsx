import type { TableWrapperProps } from '../types';

export const TableWrapper = ({ children, caption }: TableWrapperProps) => {
	return (
		<div className="ui-table__table-wrapper">
			<table className="ui-table__table">
				<caption className="ui-table__caption">{caption}</caption>
				{children}
			</table>
		</div>
	);
};
