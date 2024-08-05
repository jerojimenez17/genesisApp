"use client";

import { fbDB } from "@/firebase/config";
import Client from "@/models/Client";
import Product from "@/models/Product";
import { ProductFirebaseAdapter } from "@/models/ProductFirebaseAdapter";
import { onSnapshot, collection } from "firebase/firestore";
import {
  Suspense,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
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
import { SkeletonCard } from "./product-card-skeleton";
import { Form, useForm } from "react-hook-form";
import { number, z } from "zod";
import { UnitsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";

interface props {
  clientSelected: Client;
  session: Session | null;
}

const ProductSelector = ({ clientSelected, session }: props) => {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, startTransition] = useTransition();
  const [productSearch, setProductSearch] = useState("");
  const form = useForm<z.infer<typeof UnitsSchema>>({
    resolver: zodResolver(UnitsSchema),
    defaultValues: {},
  });
  const [unitsToOrder, setUnitsToOrder] = useState({ id: "", amount: 0 });
  const { addItem } = useContext(CartContext);
  useEffect(() => {
    onSnapshot(collection(fbDB, "stock"), (querySnapshot) => {
      startTransition(() => {
        const products = ProductFirebaseAdapter.fromDocumentDataArray(
          querySnapshot.docs
        );
        setProducts(products);
      });
    });
  }, []);

  return (
    <div className="flex p-2 w-full m-2 h-[80vh] flex-col mdÑflex-wrap rounded-lg shadow-md shadow-gray-500 bg-white z-20 bg-opacity-20">
      <h2>Seleccione Productos</h2>
      <div className="flex flex-row gap-1 mx-auto">
        <SearchInput
          handleSearch={(product: string) => {
            setProductSearch(product);
          }}
        />
        <OrderButtonSheet session={session} client={clientSelected} />
      </div>
      <div className="flex my-2 h-full w-full mx-auto justify-center z-10 flex-wrap gap-2 overflow-auto">
        {isLoading ? (
          <SkeletonCard />
        ) : (
          products &&
          products
            ?.filter((product) => {
              return product.description.includes(productSearch);
            })
            .map((product) => (
              <Card
                className="h- flex-wrap flex overflow-auto hover:bg-opacity-60 hover:shadow-gray-700 hover:shadow-md bg-white bg-opacity-30 w-52 text-center"
                key={product.id}
              >
                {product.image.includes("https") ? (
                  <Image
                    className="mx-auto rounded-lg max-h-32 h-34 w-auto"
                    src={product.image}
                    width={700}
                    height={450}
                    alt="Sin foto"
                  />
                ) : (
                  <Image
                    className="rounded-lg mx-auto max-h-32 h-auto w-auto"
                    src={noImgPhoto}
                    alt="Image Not Found"
                    height={700}
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
                  <div className="gap-2 flex flex-col">
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="Cantidad"
                      value={
                        unitsToOrder.amount > 0 &&
                        unitsToOrder.id === product.id
                          ? unitsToOrder.amount
                          : ""
                      }
                      onChange={(e) => {
                        if (Number(e.target.value) >= 0) {
                          setUnitsToOrder({
                            id: product.id,
                            amount: Number(e.target.value),
                          });
                        }
                      }}
                    />

                    <Button
                      onClick={() => {
                        let productToOrder = new Product();
                        const { ...resto } = product;
                        resto.id = "id" + product.id;
                        productToOrder = resto;

                        productToOrder.amount = unitsToOrder.amount;
                        addItem(productToOrder);
                        setUnitsToOrder({ amount: Number(""), id: "" });
                      }}
                      disabled={
                        !(
                          product.id === unitsToOrder.id &&
                          unitsToOrder.amount !== 0
                        )
                      }
                      className="w-full justify-start"
                    >
                      <span className="flex">➕</span>
                      <p className="flex mx-auto text-center">Agregar</p>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  );
};

export default ProductSelector;
