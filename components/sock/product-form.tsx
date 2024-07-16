"use client";

import { ProductSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { z } from "zod";
import { newProduct } from "../actions/newProduct";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FormSuccess } from "../form-success";
import { v4 } from "uuid";
import Image from "next/image";
import { FormError } from "../form-error";
import Product from "@/models/Product";

interface props {
  product?: Product;
}

const ProductForm = ({ product }: props) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [uploadMessages, setUploadMessage] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const emptyForm = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      cod: "",
      description: "",
      price: 0,
      internCode: "",
      id: "",
      unit: "",
      amount: 0,
      brand: "",
      category: "",
      codeBar: "",
      gain: 0.0,
      last_update: new Date(),
      salePrice: 0,
    },
  });
  const editForm = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      cod: product?.cod,
      description: product?.description,
      price: product?.price,
      internCode: product?.internCode,
      id: product?.id,
      unit: product?.unit,
      amount: product?.amount,
      brand: product?.brand,
      category: product?.category,
      codeBar: product?.codeBar,
      gain: product?.gain,
      last_update: product?.last_update,
      salePrice: product?.salePrice,
    },
  });
  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    startTransition(async () => {
      const imageName = image?.name + v4();
      const storageRef = ref(storage, `/productImage/${imageName}`);
      if (image) {
        await uploadBytes(storageRef, image)
          .then(async () => {
            const newMessageArray = uploadMessages.concat(
              "✅La imagen se cargo exitosamente!"
            );
            setUploadMessage(newMessageArray);
          })
          .catch((err) => {
            const newErrorMessageArray = errorMessages.concat(
              "❎ Tu imagen no se cargo. Revisa tu conexion y reintentalo"
            );
            setErrorMessages(newErrorMessageArray);
          });
        const imageURL = await getDownloadURL(storageRef);
        values.image = imageURL;

        await newProduct(values)
          .then((data) => {
            if (data.error) {
              const newErrorArray = errorMessages.concat(data.error);
              setErrorMessages(newErrorArray);
            }
            setUploadMessage(uploadMessages.concat("Producto Cargado"));
            form.reset();
            // setSuccess(data?.success);
          })
          .catch((error) => {
            const newErrorArray = errorMessages.concat(error.message);
            setErrorMessages(newErrorArray);
          });
      } else {
        await newProduct(values)
          .then((data) => {
            if (data.error) {
              const newErrorArray = errorMessages.concat(data.error);
              setErrorMessages(newErrorArray);
            } else {
              const newMessageArray = uploadMessages.concat(
                "✅Producto cargado exitosamente!"
              );
              setUploadMessage(newMessageArray);
            }
            form.reset();
            // setSuccess(data?.success);
          })

          .catch((error) => {
            const newErrorArray = errorMessages.concat(error.message);
            setErrorMessages(newErrorArray);
          });
      }
    });
  };

  const fileRef = emptyForm.register("image");
  let form: typeof editForm;
  if (product) {
    form = editForm;
  } else {
    form = emptyForm;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto</FormLabel>
                <FormControl>
                  <Input
                    {...fileRef}
                    onChange={(e) => {
                      if (e.currentTarget.files) {
                        setImage(e.currentTarget.files[0]);
                        console.log(e.currentTarget.files[0].name);
                      }
                    }}
                    placeholder=""
                    type="file"
                    autoComplete="image"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="cod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Codigo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder=""
                    type="text"
                    autoComplete="cod"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="internCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Codigo Interno</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder=""
                    type="text"
                    autoComplete="internCode"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder=""
                    type="text"
                    autoComplete="description"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
              // <FormItem>
              //   <FormLabel>Precio</FormLabel>
              //   <FormControl>
              //     <input
              //       type="number"
              //       placeholder="Precio"
              //       autoComplete="price"
              //       {...field}
              //       disabled={isPending}
              //     />
              //   </FormControl>
              //   <FormMessage />
              // </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="gain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Margen de utilidad</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidad</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la unidad de medida" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Unidad">Unidad</SelectItem>
                    <SelectItem value="Kg">Kg</SelectItem>
                    <SelectItem value="Gr">Gr</SelectItem>
                    <SelectItem value="Lt">Lt</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input type="number" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          +Agregar Producto
        </Button>
      </form>
      {uploadMessages.map((message) => (
        <FormSuccess key={message} message={message} />
      ))}
      {errorMessages.map((message) => (
        <FormError key={message} message={message} />
      ))}
    </Form>
  );
};

export default ProductForm;
