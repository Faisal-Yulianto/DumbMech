import { z } from "zod";

const EditProfileSchema = z.object({
    username: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    phone: z.string().nonempty("Phone is required"),
    gender: z.string().nonempty("Gender is required"),
    address: z.string().nonempty("Address is required")
  });

  export default EditProfileSchema