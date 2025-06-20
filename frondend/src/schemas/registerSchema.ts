import { z } from 'zod';

const registerSchema = z.object({
  username: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default registerSchema;
export type registerSchemaType = z.infer<typeof registerSchema>;