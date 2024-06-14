"use server";

import { getProductByDescription } from "@/data/product";
import { addProduct } from "@/firebase/stock/newProduct";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { z } from "zod";

export const newProduct = async (values: z.infer<typeof ProductSchema>) => {
  console.log(values + "Values antess");
  values.price = Number(values.price);
  console.log(values);
  const validateFields = ProductSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Campos Invalidos" };
  }
  const { id, cod, description, price, unit, internCode } = validateFields.data;
  console.log(price);
  const existingProduct = await getProductByDescription(description);
  if (existingProduct) {
    return { error: "Ups. Ya hay un producto con este nombre." };
  }
  // await db.product.create({
  //   data: {
  //     cod,
  //     description,
  //     unit,
  //     internCode,
  //     price,
  //   },
  // });
  await addProduct(validateFields.data);
  return { succeess: "☑️ Producto Creado! " };
};
