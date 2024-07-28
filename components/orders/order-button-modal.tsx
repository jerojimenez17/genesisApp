import { useContext } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { CartContext } from "./context/CartContext";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import noImgPhoto from "@/public/no-image.svg";
import { off } from "process";

const OrderButtonSheet = () => {
  const { cartState } = useContext(CartContext);
  return (
    <Sheet>
      <SheetTrigger className="bg-green-400 hover:bg-emerald-600 p-2 font-semibold bg-opacity-65 rounded-full">
        Ver Pedido
      </SheetTrigger>
      <SheetContent
        className="h-3/4 bg-cyan-200 bg-opacity-25 rounded-md"
        side={"bottom"}
      >
        <div className="flex flex-col align-middle my-4 gap-1 overflow-auto h-full ">
          {cartState.products?.map((product) => (
            <div
              // onClick={() => addItem(product)}
              className="h-20 hover:bg-opacity-60 rounded-md hover:shadow-gray-700 hover:shadow-md bg-white bg-opacity-30 w-full flex flex-wrap flex-col text-center"
              key={product.id}
            >
              {product.image.includes("https") ? (
                <Image
                  className="mx-auto my-auto rounded-lg"
                  src={product.image}
                  width={100}
                  height={80}
                  alt="Sin foto"
                />
              ) : (
                <Image
                  className="rounded-lg mx-auto"
                  src={noImgPhoto}
                  alt="Image Not Found"
                  height={50}
                  width={70}
                />
              )}
              <div className="text-xl font-semibold flex h-full flex-col">
                <h3>{product.description}</h3>
                <p>${product.price.toFixed(2)}</p>
                <p>{product.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderButtonSheet;
