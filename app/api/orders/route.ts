import { NextResponse, NextRequest } from 'next/server';
import { createOrderSchema } from '@/lib/orders/create-order.schema';
import { randomUUID } from 'crypto';

// GET /api/orders - list all orders
export async function GET(request: NextRequest) {
  // Always fetch from the public mock server on Render
  const response = await fetch('https://base-orders.onrender.com/orders', { cache: 'no-store' });
  if (!response.ok) {
    return NextResponse.json({ message: `Failed to fetch orders: ${response.status}` }, { status: response.status });
  }
  const orders = await response.json();
  return NextResponse.json(orders);
}

const generateClientOrderId = (internalOrderId: string): string => {
	return `CL-${new Date().getTime()}-${internalOrderId}`;
};

export async function POST(request: Request) {
	const body = await request.json().catch(() => null);
	const parsedBody = createOrderSchema.safeParse(body);

	if (!parsedBody.success) {
		return NextResponse.json(
			{
				message: 'Dados inválidos para criar ordem.',
				issues: parsedBody.error.issues,
			},
			{ status: 400 },
		);
	}

	const nowIso = new Date().toISOString();
	const uuid = randomUUID();

	const payload = {
		id: uuid,
		clientOrderId: generateClientOrderId(uuid),
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

	const response = await fetch(`${process.env.INTERNAL_API_BASE_URL}/orders`, {
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
