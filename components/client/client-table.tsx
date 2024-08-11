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
import { Session } from "next-auth";
import Link from "next/link";
import { set } from "zod";

interface props {
  session: Session | null;
}

const ClientTable = ({ session }: props) => {
  const { cartState } = useContext(CartContext);
  const [clientSelect, setClientSelect] = useState<Client | null>();
  const [clients, setClients] = useState<Client[]>([]);
  const [searchClient, setSearchClient] = useState("");
  useEffect(() => {
    onSnapshot(collection(fbDB, "clients"), (querySnapshot) => {
      const clients = ClientFirebaseAdapter.fromDocumentDataArray(
        querySnapshot.docs
      );
      setClients(clients);
    });
  }, []);
  return (
    <div className=" w-full h-full p-1 mx-auto text-center flex flex-col items-center">
      <div className=" flex w-full h-10 m-0 text-white flex-col items-start font-bold">
        <Link href={"/orders"}>🔙 Volver</Link>
      </div>
      {!clientSelect ? (
        <>
          <h2>Seleccione el cliente o cree uno nuevo</h2>
          <div className="flex m-1">
            <SearchInput
              handleOnChange={(e) => {
                setSearchClient(e);
              }}
              handleSearch={(e) => {
                setSearchClient(e);
              }}
            />
            <ClientButtonModal />
          </div>
          {clients
            ?.filter((client) =>
              client.name.toLowerCase().includes(searchClient.toLowerCase())
            )
            .map((client) => (
              <div
                onClick={() => {
                  setClientSelect(client);
                  console.log(client);
                }}
                className="  hover:odd:bg-opacity-60 before:bg-gray-300 h-12 font-semibold text-opacity-60 text-black justify-center flex flex-col odd:bg-white hover:even:bg-emerald-300 hover:even:bg-opacity-40  odd:bg-opacity-45 w-full"
                key={client.id}
              >
                {client.name}
              </div>
            ))}
        </>
      ) : (
        <div className="h-full">
          <ProductSelector session={session} clientSelected={clientSelect} />
        </div>
      )}
    </div>
  );
};

export default ClientTable;
