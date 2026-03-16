'use client';

import { useEffect, useRef, useState } from 'react';

export type FilterSelectOption = {
	value: string;
	label: string;
};

type OrdersGridFilterSelectProps = {
	id: string;
	name: string;
	ariaLabel: string;
	value: string;
	onChange: (nextValue: string) => void;
	options: FilterSelectOption[];
};

export const OrdersGridFilterSelect = ({
	id,
	name,
	ariaLabel,
	value,
	onChange,
	options,
}: OrdersGridFilterSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!wrapperRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const selectedOption =
		options.find((option) => option.value === value) ?? options[0];

	return (
		<div className="orders-grid__filter-select" ref={wrapperRef}>
			<input name={name} type="hidden" value={value} />
			<button
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-label={ariaLabel}
				className="orders-grid__filter-select-trigger"
				id={id}
				onClick={() => {
					setIsOpen((currentState) => !currentState);
				}}
				type="button"
			>
				<span>{selectedOption.label}</span>
				<span aria-hidden="true">▾</span>
			</button>

			{isOpen ? (
				<ul
					aria-labelledby={id}
					className="orders-grid__filter-select-menu"
					role="listbox"
				>
					{options.map((option) => (
						<li
							aria-selected={option.value === value}
							key={option.value}
							role="option"
						>
							<button
								className={`orders-grid__filter-select-option ${
									option.value === value
										? 'orders-grid__filter-select-option--selected'
										: ''
								}`.trim()}
								onClick={() => {
									onChange(option.value);
									setIsOpen(false);
								}}
								type="button"
							>
								{option.label}
							</button>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};
