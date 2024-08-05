"use client";

import { fbDB } from "@/firebase/config";
import Order, { Status } from "@/models/Order";
import { OrderFirebaseAdapter } from "@/models/OrderFirebaseAdapter";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { SkeletonCard } from "./product-card-skeleton";
import { OrderSkeleton } from "./order-skeleton";

export const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>();
  const [isLoading, startTrasition] = useTransition();
  const getOrders = () => {
    onSnapshot(collection(fbDB, "orders"), (querySnapshot) => {
      startTrasition(async () => {
        const ord = await OrderFirebaseAdapter.fromDocumentDataArray(
          querySnapshot.docs
        );
        setOrders(ord);
      });
    });
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Vendedor</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Estado Pedido</TableHead>
          <TableHead>Estado de Pago</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell>
              <OrderSkeleton />
            </TableCell>
            <TableCell>
              <OrderSkeleton />
            </TableCell>
            <TableCell>
              <OrderSkeleton />
            </TableCell>
            <TableCell>
              <OrderSkeleton />
            </TableCell>
            <TableCell>
              <OrderSkeleton />
            </TableCell>
          </TableRow>
        ) : (
          orders?.map((order) => {
            console.log(order.date);
            return (
              <TableRow
                key={order.id}
                className={`${
                  order.status === Status.pendiente
                    ? "bg-amber-300 bg-opacity-35"
                    : order.status === Status.confirmado
                    ? "bg-emerald-300 bg-opacity-35"
                    : ""
                }`}
              >
                <TableCell>
                  {new Date(order.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.client.name}</TableCell>
                <TableCell>{order.seller.split("@")[0]}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>{order.status.toLocaleUpperCase()}</TableCell>
                <TableCell>{order.paidStatus.toLocaleUpperCase()}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
