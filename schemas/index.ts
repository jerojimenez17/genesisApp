import * as z from "zod";

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
  internCode: z.string().min(1, {
    message: "Codigo Interno es obligatorio",
  }),
  description: z.string().min(1, {
    message: "Descripcion es obligatoria",
  }),
  price: z.coerce.number({
    required_error: "Precio es requerido",
    invalid_type_error: "Debe ser un numero",
  }),
  marca: z.string(),
  amount: z.coerce.number(),
  unit: z.string(),
});
