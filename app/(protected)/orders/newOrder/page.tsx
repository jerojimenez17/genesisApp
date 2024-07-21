import ClientButtonModal from "@/components/client/client-button-modal";
import ClientForm from "@/components/client/client-form";
import ClientTable from "@/components/client/client-table";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const page = () => {
  return (
    <div className="h-screen w-screen flex flex-col p-4 items-center mx-auto">
      <h2>Seleccione el cliente o cree uno nuevo</h2>
      <div className="flex m-1">
        <SearchInput />
        <ClientButtonModal />
      </div>
      <div className="h-full w-full m-2">
        <ClientTable />
      </div>
    </div>
  );
};

export default page;
