import { OrderSkeleton } from "@/components/orders/order-skeleton";
import { OrdersTable } from "@/components/orders/orders-table";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="h-screen w-screen flex flex-col p-4 items-center mx-auto">
      <div className="w-full h-20 align-middle flex mx-auto items-center flex-row justify-center">
        <Link
          href={"orders/newOrder"}
          // onClick={() => {}}
          className="rounded-full p-2 bg-black text-white hover:bg-white hover:bg-opacity-10 z-10 shadow-sm shadow-cyan-100 m-2"
        >
          Nuevo Pedido
        </Link>
      </div>
      <OrdersTable />
    </div>
  );
};

export default page;
