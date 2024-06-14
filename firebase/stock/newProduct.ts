import Product from "@/models/Product";
import { fbDB } from "../config";
import { addDoc, collection } from "firebase/firestore";

export const addProduct = async (product: Product) => {
  try {
    const collectionRef = collection(fbDB, "stock");
    await addDoc(collectionRef, product);
  } catch (err) {
    return { error: "Error al guardar producto" };
  }
};
