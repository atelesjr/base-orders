import { NextResponse } from 'next/server';
import { createOrderSchema } from '@/lib/orders/create-order.schema';
import { fetchWithTimeout } from '@/lib/shared/fetch-with-timeout';
import { env } from '@/lib/shared/env';

type ExistingOrder = { id?: string };

const generateClientOrderId = (internalOrderId: string): string => {
	return `CL-${new Date().getTime()}-${internalOrderId}`;
};

const getNextOrderId = async (): Promise<string> => {
	const response = await fetchWithTimeout(`${env.apiBaseUrl}/orders`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error(`Falha ao carregar ordens existentes: ${response.status}`);
	}

	const orders = (await response.json()) as ExistingOrder[];
	const maxId = orders.reduce((currentMax, order) => {
		const parsedId = Number(order.id);
		if (!Number.isInteger(parsedId) || parsedId <= 0) {
			return currentMax;
		}

		return Math.max(currentMax, parsedId);
	}, 0);

	return String(maxId + 1);
};

export async function POST(request: Request) {
	const body = await request.json().catch(() => null);
	const parsedBody = createOrderSchema.safeParse(body);

	if (!parsedBody.success) {
		return NextResponse.json(
			{
				message: 'Dados invalidos para criar ordem.',
				issues: parsedBody.error.issues,
			},
			{ status: 400 },
		);
	}

	const nowIso = new Date().toISOString();
	let nextOrderId: string;

	try {
		nextOrderId = await getNextOrderId();
	} catch (error) {
		return NextResponse.json(
			{
				message:
					error instanceof Error
						? error.message
						: 'Falha ao gerar ID da ordem.',
			},
			{ status: 500 },
		);
	}

	const payload = {
		id: nextOrderId,
		clientOrderId: generateClientOrderId(nextOrderId),
		exchangeOrderId: null,
		executionId: null,
		instrument: parsedBody.data.instrument,
		side: parsedBody.data.side,
		price: parsedBody.data.price,
		quantity: parsedBody.data.quantity,
		remainingQuantity: parsedBody.data.quantity,
		status: 'Aberta' as const,
		timestamp: nowIso,
		statusHistory: [{ status: 'Aberta' as const, updatedAt: nowIso }],
	};

	const response = await fetchWithTimeout(`${env.apiBaseUrl}/orders`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
		cache: 'no-store',
	});

	if (!response.ok) {
		return NextResponse.json(
			{ message: `Falha ao criar ordem: ${response.status}` },
			{ status: response.status },
		);
	}

	const createdOrder = await response.json();
	return NextResponse.json(createdOrder, { status: 201 });
}
