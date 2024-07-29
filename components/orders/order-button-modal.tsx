import { useContext } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { CartContext } from "./context/CartContext";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import noImgPhoto from "@/public/no-image.svg";
import { off } from "process";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

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
        <Table className="text-white text-center my-4">
          <TableHeader className="bg-black bg-opacity-85 text-center text-opacity-100 text-white ">
            <TableRow>
              <TableHead className="w-5 text-center">Imagen</TableHead>
              <TableHead className="text-center w-15">Descripcion</TableHead>
              <TableHead className="text-center">Unidad</TableHead>
              <TableHead className="text-center">Cantidad</TableHead>
              <TableHead className="text-center">Precio</TableHead>
              <TableHead className="text-center">SubTotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {cartState.products?.map((product) => (
              <TableRow
                // onClick={() => addItem(product)}
                className=" hover:bg-opacity-60 rounded-md hover:shadow-gray-700 hover:shadow-md bg-white bg-opacity-30"
                key={product.id}
              >
                {product.image.includes("https") ? (
                  <TableCell>
                    <Image
                      className="mx-auto my-auto rounded-lg"
                      src={product.image}
                      width={100}
                      height={80}
                      alt="Sin foto"
                    />
                  </TableCell>
                ) : (
                  <TableCell>
                    <Image
                      className="rounded-lg mx-auto"
                      src={noImgPhoto}
                      alt="Image Not Found"
                      height={50}
                      width={70}
                    />
                  </TableCell>
                )}
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.amount * product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>
                $
                {cartState.products.reduce(
                  (acc, p) => acc + p.price * p.amount,
                  0
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </SheetContent>
    </Sheet>
  );
};

export default OrderButtonSheet;
