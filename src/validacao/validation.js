import { z } from 'zod';

const productSchema = z.object({
    id: z.number().optional(), // ID é opcional para novos produtos
    name: z.string().min(1, "O nome é obrigatório"),
    brand: z.string().min(1, "A marca é obrigatória"),
    price: z.number().positive("O preço deve ser um número positivo"),
});

export { productSchema };
