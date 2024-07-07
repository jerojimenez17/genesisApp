"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import noImgPhoto from "../../public/no-image.svg";
import { getProducts } from "@/data/product";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { fbDB } from "@/firebase/config";
import { FirebaseAdapter } from "@/models/FirebaseAdapter";
import Product from "@/models/Product";
import Image from "next/image";

interface props {
  descriptionFilter: string;
}

const StockTable = ({ descriptionFilter }: props) => {
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    onSnapshot(collection(fbDB, "stock"), (querySnapshot) => {
      const products = FirebaseAdapter.fromDocumentDataArray(
        querySnapshot.docs
      );
      setProducts(products);
    });
  }, []);
  return (
    <Table className="text-white bg-white bg-opacity-20 backdrop-filter shadow my-5 backdrop-blur-3xl w-3/4 mx-auto">
      <TableHeader className="bg-blue-500">
        <TableRow className=" hover:bg-gray hover:backdrop-filter hover:backdrop-blur ">
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-lg p-2">
            Codigo
          </TableHead>
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-lg p-2 w-10">
            Codigo Interno
          </TableHead>
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-lg p-2">
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
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-lg p-2">
            Precio de Venta
          </TableHead>
          <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-lg p-2">
            Foto
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products
          ?.filter((product) => {
            return product.description
              .toLowerCase()
              .includes(descriptionFilter);
          })
          .map((product) => {
            return (
              <TableRow
                className="text-center hover:text-black hover:bg-gray hover:backdrop-filter hover:backdrop-blur-lg items-center"
                key={product.cod}
              >
                <TableCell className="font-medium w-10">
                  {product.cod}
                </TableCell>
                <TableCell className="font-medium w-10">
                  {product.internCode}
                </TableCell>
                <TableCell className="font-medium">
                  {product.description}
                </TableCell>
                <TableCell className="font-medium">{product.unit}</TableCell>
                <TableCell className="font-medium">{product.amount}</TableCell>
                <TableCell className="font-medium">${product.price}</TableCell>
                <TableCell className="font-medium">
                  ${Number(product.salePrice).toFixed(2)}
                </TableCell>
                <TableCell className="items-center align-middle max-h-20">
                  {product.image.includes("https") ? (
                    <Image
                      className="rounded-lg "
                      src={product.image}
                      alt="Image Not Found"
                      height={145}
                      width={85}
                    />
                  ) : (
                    <Image
                      className="rounded-lg"
                      src={noImgPhoto}
                      alt="Image Not Found"
                      height={70}
                      width={75}
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default StockTable;
