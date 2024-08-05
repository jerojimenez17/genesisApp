import { fbDB } from "../config";
import { addDoc, collection } from "firebase/firestore";
import Order from "@/models/Order";

export const addOrder = async (order: Order) => {
  try {
    const collectionRef = collection(fbDB, "orders");
    await addDoc(collectionRef, {
      id: order.id ? order.id : "",
      products: order.products ? order.products : [],
      client: order.client ? order.client.id : null,
      date: order.date ? order.date : null,
      status: order.status ? order.status : null,
      total: order.total ? order.total : 0,
      seller: order.seller,
      paidStatus: order.paidStatus ? order.paidStatus : null,
    });
  } catch (err) {
    return { error: "Error al guardar Orden" };
  }
};
