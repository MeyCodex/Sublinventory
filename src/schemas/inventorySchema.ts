import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});
export const createCategorySchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").trim(),
});

// Insumos
export const supplyFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").trim(),
  category_id: z.coerce.number().positive("La categoría es requerida"),
  description: z.string().nullable(),
  color: z.string().nullable(),
  size: z.string().nullable(),
  quantity: z.coerce
    .number()
    .int("Debe ser un número entero")
    .min(0, "La cantidad no puede ser negativa"),
  minimum_stock: z.coerce
    .number()
    .int("Debe ser un número entero")
    .min(0, "El stock mínimo no puede ser negativo"),
  measurement_unit: z
    .string()
    .min(1, "La unidad de medida es requerida")
    .trim(),
  purchase_price: z.coerce
    .number()
    .positive("El precio de compra es requerido"),
  supplier: z.string().nullable(),
});

export const supplyWithCategorySchema = supplyFormSchema.extend({
  id: z.number(),
  updated_at: z.string(),
  category_name: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
export type SupplyFormInput = z.input<typeof supplyFormSchema>;
export type SupplyFormData = z.infer<typeof supplyFormSchema>;
export type SupplyWithCategory = z.infer<typeof supplyWithCategorySchema>;
