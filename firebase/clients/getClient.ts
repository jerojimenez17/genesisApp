import { doc, getDoc } from "firebase/firestore";
import { fbDB } from "../config";
import { ClientFirebaseAdapter } from "@/models/ClientFirebaseAdapter";
import Client from "@/models/Client";

export const getClient = async (clientId: string) => {
  let client = new Client();
  await getDoc(doc(fbDB, `clients/${clientId}`)).then((data) => {
    if (data.exists()) {
      const adaptedData = ClientFirebaseAdapter.fromDocumentData(
        data.data(),
        clientId
      );

      client = adaptedData;
    }
  });
  return client;
};
