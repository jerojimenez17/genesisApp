import { auth } from "@/auth";
import ClientTable from "@/components/client/client-table";
import CartProvider from "@/components/orders/context/CartProvider";

const page = async () => {
  const session = await auth();
  return (
    <div className="h-full w-full flex flex-col p-1 items-center mx-auto">
      <div className="h-full w-full flex flex-col flex-wrap m-2">
        <CartProvider>
          <ClientTable session={session} />
        </CartProvider>
      </div>
    </div>
  );
};

export default page;
