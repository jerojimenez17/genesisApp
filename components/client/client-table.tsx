"use client";

import { fbDB } from "@/firebase/config";
import Client from "@/models/Client";
import { ClientFirebaseAdapter } from "@/models/ClientFirebaseAdapter";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const ClientTable = () => {
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
    <div className="overflow-auto h-full w-screnn p-2 mx-auto text-center flex flex-col items-center">
      {clients?.map((client) => (
        <div
          className="hover:odd:bg-opacity-40 before:bg-gray-300 h-12 font-semibold text-opacity-60 text-black justify-center flex flex-col odd:bg-white hover:even:bg-emerald-300 hover:even:bg-opacity-40  odd:bg-opacity-30 w-full"
          key={client.id}
        >
          {client.name}
        </div>
      ))}
    </div>
  );
};

export default ClientTable;
