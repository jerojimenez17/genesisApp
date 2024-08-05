"use client";
import Client from "@/models/Client";
import { Button } from "../ui/button";
import { addOrder } from "@/firebase/orders/newOrder";
import Order, { PaidStatus, Status } from "@/models/Order";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { fbDB } from "@/firebase/config";
import { auth } from "@/auth";

interface props {
  client: Client;
  user: string | null | undefined;
}

const SaveOrder = ({ client, user }: props) => {
  const { cartState, removeAll } = useContext(CartContext);

  const handleSaveOrder = async (client: Client) => {
    const total = cartState.products.reduce(
      (sum, product) => sum + product.amount * product.price,
      0
    );
    const order: Order = {
      client: client,
      seller: user ? user : "",
      total: total,
      date: new Date(Date.now()),
      products: cartState.products,
      id: "",
      paidStatus: PaidStatus.inpago,
      status: Status.pendiente,
    };
    await addOrder(order);
    removeAll();
  };

  return (
    <Button
      onClick={() => handleSaveOrder(client)}
      className="bg-green-500 bg-opacity-85 hover:text-amber-400 text-amber-300 font-bold"
    >
      Confirmar Pedido
    </Button>
  );
};

export default SaveOrder;
