import { z } from "zod";

const addProductSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  productDesc: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be less than 500 characters"),
  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Price must be a number" })
    .refine((val) => val > 0, { message: "Price must be greater than 0" }),
  qty: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Quantity must be a number" })
    .refine((val) => Number.isInteger(val), {
      message: "Quantity must be an integer",
    })
    .refine((val) => val > 0, { message: "Quantity must be greater than 0" }),
  categoryId: z
    .number()
    .int()
    .positive({ message: "Category ID must be a positive integer" })
    .refine((val) => val > 0, { message: "Please select a category" }),
});

export default addProductSchema;

export type addProductSchemaType = z.infer<typeof addProductSchema>
