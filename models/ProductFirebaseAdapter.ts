import { DocumentData } from "firebase/firestore";
import Product from "./Product";
import noImg from "@/public/no-image.svg";

export class ProductFirebaseAdapter {
  public static fromDocumentDataArray(data: DocumentData[]): Product[] {
    let state: Product[] = [];
    data.forEach((d) => {
      state.push(ProductFirebaseAdapter.fromDocumentData(d.data(), d.id));
    });
    return state;
  }

  public static fromDocumentData(data: DocumentData, dataId: string): Product {
    let product = new Product();
    product.id = dataId;
    data.description
      ? (product.description = data.description)
      : (product.description = ""),
      data.price ? (product.price = data.price) : (product.price = 0),
      data.amount ? (product.amount = data.amount) : (product.amount = 0),
      data.gain ? (product.gain = data.gain) : (product.gain = 0),
      data.cod ? (product.cod = data.cod) : (product.cod = ""),
      data.internCode
        ? (product.internCode = data.internCode)
        : (product.internCode = ""),
      data.last_update
        ? (product.last_update = data.last_update)
        : (product.last_update = new Date()),
      (product.salePrice = data.salePrice);
    if (data.image.length === 0) {
      product.image = "NoImg";
      console.log(product.image);
    }
    product.image = data.image;

    return product;
  }
}
