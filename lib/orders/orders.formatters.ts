export const formatTimestampBR = (value: string | number | Date): string => {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return '--';
	}

	const parts = new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'America/Sao_Paulo',
	}).formatToParts(date);

	const get = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((p) => p.type === type)?.value ?? '';

	const day = get('day');
	const month = get('month').replace('.', '').toLowerCase();
	const year = get('year');
	const hour = get('hour');
	const minute = get('minute');

	return `${day}/${month}/${year} ${hour}:${minute}hs`;
};
