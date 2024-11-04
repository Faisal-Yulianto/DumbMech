import { z } from "zod";

const addProductSchema = z.object({
  ProductName: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be less than 500 characters"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),
  qty: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
});

export default addProductSchema;
