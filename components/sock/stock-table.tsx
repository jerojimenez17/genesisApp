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
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { fbDB, storage } from "@/firebase/config";
import { ProductFirebaseAdapter } from "@/models/ProductFirebaseAdapter";
import Product from "@/models/Product";
import Image from "next/image";
import { Button } from "../ui/button";
import DeleteButton from "../DeleteButton";
import Modal from "../ui/Modal";
import { deleteObject, ref } from "firebase/storage";
import ProductForm from "./product-form";

interface props {
  descriptionFilter: string;
}

const StockTable = ({ descriptionFilter }: props) => {
  const [products, setProducts] = useState<Product[]>();
  const [productToEdit, setProductToEdit] = useState<Product>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    onSnapshot(collection(fbDB, "stock"), (querySnapshot) => {
      const products = ProductFirebaseAdapter.fromDocumentDataArray(
        querySnapshot.docs
      );
      setProducts(products);
    });
  }, []);
  return (
    <>
      <Table className="text-white bar rounded-xl bg-white bg-opacity-20 backdrop-filter shadow my-5 backdrop-blur-3xl w-full text-sm md:text-md md:w-3/4 md:mx-auto">
        <TableHeader className="bg-blue-500 bg-opacity-80">
          <TableRow className=" hover:bg-gray hover:backdrop-filter hover:backdrop-blur ">
            <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-sm md:text-md  p-2 w-2 sm:w-12">
              Codigo
            </TableHead>
            <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-sm md:text-md  p-2 w-4">
              Descripcion
            </TableHead>
            <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-sm md:text-md  p-2">
              Unidad
            </TableHead>
            <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-sm md:text-md  p-2">
              Cantidad
            </TableHead>
            <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-sm md:text-md  p-2">
              Precio
            </TableHead>
            <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-sm md:text-md  p-2">
              Precio de Venta
            </TableHead>
            <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-sm md:text-md  p-2">
              Foto
            </TableHead>
            <TableHead className="hover:text-gray-800 text-center font-extrabold text-white text-sm md:text-md  p-1">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products
            ?.filter((product) => {
              return (
                product.description.toLowerCase().includes(descriptionFilter) ||
                product.cod.toLowerCase().includes(descriptionFilter) //TO DO: Implement switch only cod
              );
            })
            .map((product) => {
              return (
                <TableRow
                  // onClick={(e) => {
                  //   console.log(e.currentTarget.id);
                  //   if (e.currentTarget.id.toLowerCase() !== "deleteButton") {
                  //     setProductToEdit(product);
                  //     setOpenEditModal(true);
                  //   }
                  // }}
                  className="text-center hover:text-black hover:bg-gray hover:backdrop-filter hover:backdrop-blur-lg items-center"
                  key={product.cod}
                >
                  <TableCell className="font-medium w-5 md:w-10">
                    {product.cod}
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.description}
                  </TableCell>
                  <TableCell className="font-medium">{product.unit}</TableCell>
                  <TableCell className="font-medium">
                    {product.amount}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${product.price}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${Number(product.salePrice).toFixed(2)}
                  </TableCell>
                  <TableCell className="items-center align-middle">
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
                  <TableCell className="z-50">
                    <DeleteButton
                      id="deleteButton"
                      onClick={() => {
                        setProductToEdit(product);
                        setOpenDeleteModal(true);
                        console.log(openDeleteModal);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {productToEdit && (
        <Modal
          className=""
          blockButton={false}
          onCancel={() => {
            setOpenDeleteModal(false);
          }}
          visible={openDeleteModal}
          key={productToEdit.id}
          onClose={() => {
            setOpenDeleteModal(false);
          }}
          onAcept={async () => {
            console.log(productToEdit);
            if (productToEdit.image !== "") {
              const fileRef = ref(storage, `${productToEdit.image}`);
              await deleteObject(fileRef);
            }
            await deleteDoc(doc(fbDB, "stock", productToEdit.id));
            setOpenDeleteModal(false);
          }}
          message="Seguro que desea eliminar este producto?"
        />
      )}
      {productToEdit && (
        <Modal
          onClose={() => setOpenEditModal(false)}
          visible={openEditModal}
          blockButton={false}
        >
          <ProductForm product={productToEdit} />
        </Modal>
      )}
    </>
  );
};

export default StockTable;
