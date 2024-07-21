import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-screen flex flex-col p-4 items-center mx-auto">
      <div className="w-full h-20 align-middle flex mx-auto items-center flex-row justify-center">
        <SearchInput className="bg-white bg-opacity-20 m-0" />
        <Link
          href={"orders/newOrder"}
          // onClick={() => {}}
          className="rounded-full p-2 bg-black text-white hover:bg-white hover:bg-opacity-10 z-50 shadow-sm shadow-cyan-100 m-2"
        >
          Nuevo Pedido
        </Link>
      </div>
    </div>
  );
};

export default page;
