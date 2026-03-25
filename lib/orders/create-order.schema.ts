import { z } from 'zod';

export const createOrderSchema = z.object({
	instrument: z
		.string()
		.trim()
		.min(1, 'Instrumento e obrigatorio')
		.max(30, 'Instrumento deve ter no maximo 30 caracteres')
		.transform((value) => value.toUpperCase()),
	side: z
		.enum(['Compra', 'Venda'], {
			error: 'Lado e obrigatorio',
		})
		.optional()
		.refine((val) => val === 'Compra' || val === 'Venda', {
			message: 'Lado e obrigatorio',
		}),
	price: z
		.number({ error: 'Preco e obrigatorio' })
		.finite('Preco invalido')
		.positive('Preco deve ser maior que zero'),
	quantity: z
		.number({ error: 'Quantidade e obrigatoria' })
		.finite('Quantidade invalida')
		.positive('Quantidade deve ser maior que zero'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
