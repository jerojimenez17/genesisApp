import { fbDB } from "../config";
import { addDoc, collection, doc, runTransaction } from "firebase/firestore";
import Order from "@/models/Order";

export const addOrder = async (order: Order) => {
  try {
    for (let i = 0; i < order.products.length; i++) {
      await discountStock(order.products[i].id, order.products[i].amount);
    }
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

async function discountStock(
  productId: string,
  discountValue: number
): Promise<void> {
  console.log();
  const productRef = doc(fbDB, "stock", productId.split("id")[1]);

  try {
    await runTransaction(fbDB, async (transaction) => {
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        throw new Error("El producto no existe!");
      }

      const productData = productDoc.data();
      const currentAmount = productData?.amount ?? 0;

      const newAmount = currentAmount - discountValue;

      if (newAmount < 0) {
        throw new Error("No hay suficiente stock");
      }

      transaction.update(productRef, { amount: newAmount });
    });

    console.log("Transaction successfully committed!");
  } catch (error) {
    console.error("Transaction failed: ", error);
  }
}
