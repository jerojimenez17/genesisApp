"use server";

import { getProductByDescription } from "@/data/product";
import { addProduct } from "@/firebase/stock/newProduct";
import { db } from "@/lib/db";
import Product from "@/models/Product";
import { ProductSchema } from "@/schemas";
import { z } from "zod";

export const newProduct = async (values: z.infer<typeof ProductSchema>) => {
  console.log(values + "Values antess");

  values.price = Number(values.price);
  console.log(values.price + values.price * (1.0 + Number(values.gain) * 0.01));
  let product: Product = {
    id: "",
    cod: values.cod,
    price: values.price,
    amount: values.amount,
    image: values.image,
    brand: values.brand,
    gain: values.gain,
    salePrice: values.price * (1 + Number(values.gain) * 0.01),
    codeBar: values.internCode,
    category: "",
    description: values.description,
    unit: values.unit,
    // category: values.category, if in the future add category field
    internCode: values.internCode,

    last_update: new Date(Date.now()),
  };
  console.log(product);
  const validateFields = ProductSchema.safeParse(product);
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
  await addProduct(product);
  return { succcess: "☑️ Producto Creado! " };
};
