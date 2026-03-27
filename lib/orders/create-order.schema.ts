import { z } from 'zod';

export const createOrderSchema = z.object({
	instrument: z
		.string()
		.trim()
		.min(1, 'Instrumento é obrigatório')
		.max(30, 'Instrumento deve ter no máximo 30 caracteres')
		.transform((value) => value.toUpperCase()),
	side: z
		.enum(['Compra', 'Venda'], {
			error: 'Lado é obrigatório',
		})
		.optional()
		.refine((val) => val === 'Compra' || val === 'Venda', {
			message: 'Lado é obrigatório',
		}),
	price: z
		.number({ error: 'Preço é obrigatório' })
		.finite('Preço inválido')
		.positive('Preço deve ser maior que zero'),
	quantity: z
		.number({ error: 'Quantidade é obrigatória' })
		.finite('Quantidade inválida')
		.positive('Quantidade deve ser maior que zero'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
