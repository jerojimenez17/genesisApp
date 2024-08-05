import { doc, DocumentData, getDoc } from "firebase/firestore";
import Order from "./Order";
import noImg from "@/public/no-image.svg";
import { ClientFirebaseAdapter } from "./ClientFirebaseAdapter";
import { fbDB } from "@/firebase/config";
import { getClient } from "@/firebase/clients/getClient";
import Client from "./Client";

export class OrderFirebaseAdapter {
  public formated = async (d: DocumentData[]) => {};
  public static async fromDocumentDataArray(data: DocumentData[]) {
    let state: Order[] = [];
    for (let i = 0; i < data.length; i++) {
      let formatedData = OrderFirebaseAdapter.fromDocumentData(
        data[i].data(),
        data[i].id
      );
      formatedData.client = await getClient(formatedData.client.id);
      state.push(formatedData);
    }
    console.log(state);
    return state;
  }

  public static fromDocumentData(data: DocumentData, dataId: string) {
    let order = new Order();
    order.seller = data.seller;
    order.status = data.status;
    order.id = dataId;

    order.products = data.products;
    (order.date = new Date(
      data.date.seconds * 1000 + data.date.nanoseconds / 1000000000
    )),
      (order.paidStatus = data.paidStatus);
    order.total = data.total;
    order.client.id = data.client;
    return order;
  }
}
