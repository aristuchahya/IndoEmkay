import { z } from "zod";

export const productSchema = z.object({
  product_name: z
    .string()
    .min(1, "Product name cannot be empty")
    .max(150, "Product name cannot be longer than 150 characters"),
  category: z
    .string()
    .min(1, "Category cannot be empty")
    .max(100, "Category cannot be longer than 100 characters"),
  price: z
    .number()
    .min(1, "Price must be greater than 0")
    .positive("Price must be a positive number"),
  discount: z
    .number()
    .min(0, "Discount must be greater than or equal to 0")
    .max(100, "Discount must be less than or equal to 100")
    .positive("Discount must be a positive number"),
});
