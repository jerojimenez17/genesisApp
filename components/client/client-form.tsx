"use client";
import { ClientSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { z } from "zod";
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
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import Product from "@/models/Product";
import { addClient } from "@/firebase/clients/newClient";
import Client from "@/models/Client";
import { newClient } from "../actions/newClient";

interface props {
  product?: Product;
}

const ClientForm = ({ product }: props) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [uploadMessages, setUploadMessage] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof ClientSchema>>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      name: "",
      address: "",
      balance: 0,
      orders: [],
      id: "",
      cellPhone: 0,
      date: new Date(),
      last_update: new Date(),
    },
  });
  //   const editForm = useForm<z.infer<typeof ProductSchema>>({
  //     resolver: zodResolver(ProductSchema),
  //     defaultValues: {
  //       cod: product?.cod,
  //       description: product?.description,
  //       price: product?.price,
  //       internCode: product?.internCode,
  //       id: product?.id,
  //       unit: product?.unit,
  //       amount: product?.amount,
  //       brand: product?.brand,
  //       category: product?.category,
  //       codeBar: product?.codeBar,
  //       gain: product?.gain,
  //       last_update: product?.last_update,
  //       salePrice: product?.salePrice,
  //     },
  //   });
  const onSubmit = (values: z.infer<typeof ClientSchema>) => {
    // console.log("newjjjjValues");
    startTransition(async () => {
      // let newValues: Client = new Client();
      // newValues.orders = [];
      // newValues.address = values.address;
      // newValues.balance = 0;
      // newValues.cellPhone = values.cellPhone;
      // newValues.date = values.date;
      // newValues.name = values.name;
      // newValues.id = values.id;
      // newValues.last_update = values.last_update;
      await newClient(values)
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
          setSuccess(data?.success);
        })

        .catch((error) => {
          const newErrorArray = errorMessages.concat(error.message);
          setErrorMessages(newErrorArray);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder=""
                    type="text"
                    autoComplete="name"
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder=""
                    type="text"
                    autoComplete="address"
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
            name="cellPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero Telefono</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder=""
                    type="tel"
                    autoComplete="cellPhone"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          +Agregar Cliente
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

export default ClientForm;
