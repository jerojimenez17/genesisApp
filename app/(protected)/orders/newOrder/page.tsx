import ClientTable from "@/components/client/client-table";
import CartProvider from "@/components/orders/context/CartProvider";

const page = () => {
  return (
    <div className="h-screen w-screen flex flex-col p-4 items-center mx-auto">
      <div className="h-full w-full flex flex-col flex-wrap overflow-y-hidden m-2">
        <CartProvider>
          <ClientTable />
        </CartProvider>
      </div>
    </div>
  );
};

export default page;
