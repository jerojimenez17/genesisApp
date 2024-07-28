"use client";

import { fbDB } from "@/firebase/config";
import Client from "@/models/Client";
import { ClientFirebaseAdapter } from "@/models/ClientFirebaseAdapter";
import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import ProductSelector from "../orders/product-selector";
import SearchInput from "../SearchInput";
import ClientButtonModal from "./client-button-modal";
import { CartContext } from "../orders/context/CartContext";

const ClientTable = () => {
  const { cartState } = useContext(CartContext);
  const [clientSelect, setClientSelect] = useState<Client | null>();
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    onSnapshot(collection(fbDB, "clients"), (querySnapshot) => {
      const clients = ClientFirebaseAdapter.fromDocumentDataArray(
        querySnapshot.docs
      );
      setClients(clients);
    });
  }, []);
  return (
    <div className="h-full w-screnn p-2 mx-auto text-center flex flex-col items-center">
      {!clientSelect ? (
        <>
          <h2>Seleccione el cliente o cree uno nuevo</h2>
          <div className="flex m-1">
            <SearchInput />
            <ClientButtonModal />
          </div>
          {clients?.map((client) => (
            <div
              onClick={() => {
                setClientSelect(client);
                console.log(client);
              }}
              className="hover:odd:bg-opacity-40 before:bg-gray-300 h-12 font-semibold text-opacity-60 text-black justify-center flex flex-col odd:bg-white hover:even:bg-emerald-300 hover:even:bg-opacity-40  odd:bg-opacity-30 w-full"
              key={client.id}
            >
              {client.name}
            </div>
          ))}
        </>
      ) : (
        <ProductSelector />
      )}
    </div>
  );
};

export default ClientTable;
