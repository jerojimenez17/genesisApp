import * as z from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png"];

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email es obligatorio" }),
  password: z.string().min(1, {
    message: "Contraseña es obligatorio",
  }),
});
export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email es obligatorio" }),
  password: z.string().min(6, {
    message: "6 caracteres minimo",
  }),
  name: z.string().min(1, {
    message: "Nombre es obligatorio",
  }),
});

export const ProductSchema = z.object({
  id: z.string(),
  cod: z.string().min(1, {
    message: "Codigo es obligatorio",
  }),
  description: z.string().min(1, {
    message: "Descripcion es obligatoria",
  }),
  internCode: z.string().min(1, {
    message: "Codigo Interno es obligatorio",
  }),
  codeBar: z.string(),
  price: z.coerce.number({
    required_error: "Precio es requerido",
    invalid_type_error: "Debe ser un numero",
  }),
  gain: z.coerce.number({
    invalid_type_error: "Debe ser un numero",
  }),
  salePrice: z.coerce.number(),
  brand: z.string(),
  image: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
  last_update: z.any(),
  category: z.string(),

  // .any()
  // .refine((file) => {
  //   return !file || file.size <= MAX_UPLOAD_SIZE;
  // }, "File size must be less than 3MB")
  // .refine((file) => {
  //   return ACCEPTED_FILE_TYPES.includes(file.type);
  // }, "El archivo debe ser PDF o PNG")
  // .optional(),
  amount: z.coerce.number(),
  unit: z.string(),
});
