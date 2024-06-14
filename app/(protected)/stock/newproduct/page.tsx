import ProductForm from "@/components/sock/product-form";
import StockPanel from "@/components/sock/stock-panel";

const page = () => {
  return (
    <div className="flex flex-col h-full w-full items-center overflow-auto">
      <StockPanel className="flex-wrap h-3/4 my-4">
        <ProductForm />
      </StockPanel>
    </div>
  );
};

export default page;
