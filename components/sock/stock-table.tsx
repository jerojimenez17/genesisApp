import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getProducts } from "@/data/product";

const StockTable = async () => {
  const products = await getProducts();
  return (
    <Table className="text-white bg-gray backdrop-filter shadow my-5 backdrop-blur-3xl w-3/4 mx-auto">
      <TableHeader>
        <TableRow className=" hover:bg-gray hover:backdrop-filter hover:backdrop-blur ">
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-lg p-2">
            Codigo
          </TableHead>
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-lg p-2 w-10">
            Codigo Interno
          </TableHead>
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-stone-300 text-lg p-2">
            Descripcion
          </TableHead>
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-lg p-2">
            Unidad
          </TableHead>
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-lg p-2">
            Cantidad
          </TableHead>
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-lg p-2">
            Precio
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => {
          return (
            <TableRow
              className="text-center hover:text-black hover:bg-gray hover:backdrop-filter hover:backdrop-blur-lg"
              key={product.cod}
            >
              <TableCell className="font-medium w-10">{product.cod}</TableCell>
              <TableCell className="font-medium w-10">
                {product.internCode}
              </TableCell>
              <TableCell className="font-medium">
                {product.description}
              </TableCell>
              <TableCell className="font-medium">{product.unit}</TableCell>
              <TableCell className="font-medium">${product.price}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default StockTable;
