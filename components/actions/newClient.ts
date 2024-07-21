"use server";

import { getProductByDescription } from "@/data/product";
import { addClient } from "@/firebase/clients/newClient";
import Client from "@/models/Client";
import { ClientSchema, ProductSchema } from "@/schemas";
import { z } from "zod";

export const newClient = async (values: z.infer<typeof ClientSchema>) => {
  let client: Client = {
    id: values.id,
    name: values.name,
    address: values.address,
    orders: [],
    balance: 0,
    cellPhone: values.cellPhone,
    date: new Date(),
    last_update: new Date(),
  };
  const validateFields = ClientSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Campos Invalidos" };
  }
  await addClient(client);
  return { success: "☑️ Producto Creado! " };
};
