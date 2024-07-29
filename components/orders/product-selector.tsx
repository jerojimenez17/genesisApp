"use client";

import { fbDB } from "@/firebase/config";
import Client from "@/models/Client";
import Product from "@/models/Product";
import { ProductFirebaseAdapter } from "@/models/ProductFirebaseAdapter";
import { onSnapshot, collection } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import noImgPhoto from "../../public/no-image.svg";
import SearchInput from "../SearchInput";
import OrderButtonSheet from "./order-button-modal";
import { CartContext } from "./context/CartContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface props {
  clientSelected: Client;
}

const ProductSelector = () => {
  const [products, setProducts] = useState<Product[]>();
  const [unitsToOrder, setUnitsToOrder] = useState(0);
  const { addItem } = useContext(CartContext);
  useEffect(() => {
    onSnapshot(collection(fbDB, "stock"), (querySnapshot) => {
      const products = ProductFirebaseAdapter.fromDocumentDataArray(
        querySnapshot.docs
      );
      setProducts(products);
    });
  }, []);
  return (
    <div className="flex h-full p-2 flex-col bg-transparent rounded-lg shadow-md shadow-gray-500 bg-white z-20 bg-opacity-20">
      <h2>Seleccione Productos</h2>
      <div className="flex flex-row gap-1 mx-auto">
        <SearchInput />
        <OrderButtonSheet />
      </div>
      <div className="flex my-2 h-screen w-full mx-auto justify-center z-10 flex-wrap gap-3 overflow-auto">
        {products?.map((product) => (
          <Card
            className="h-fit hover:bg-opacity-60 hover:shadow-gray-700 hover:shadow-md bg-white bg-opacity-30 w-52 text-center"
            key={product.id}
          >
            {product.image.includes("https") ? (
              <Image
                className="mx-auto rounded-lg"
                src={product.image}
                width={200}
                height={150}
                alt="Sin foto"
              />
            ) : (
              <Image
                className="rounded-lg mx-auto"
                src={noImgPhoto}
                alt="Image Not Found"
                height={70}
                width={105}
              />
            )}
            <CardHeader className="text-xl">
              <CardTitle>{product.description}</CardTitle>
              <CardDescription>
                Precio: ${product.price.toFixed(2)}
              </CardDescription>
              <CardDescription>
                Cantidad: {product.amount.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Input
                  type="number"
                  placeholder="Cantidad"
                  onChange={(e) => {
                    setUnitsToOrder(Number(e.target.value));
                  }}
                />
                <Button
                  onClick={() => {
                    let productToOrder = new Product();
                    const { ...resto } = product;
                    resto.id = "id" + product.id;
                    productToOrder = resto;
                    productToOrder.amount = unitsToOrder;
                    addItem(productToOrder);
                  }}
                >
                  Agregar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;
