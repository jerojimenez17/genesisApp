import ProductForm from "@/components/sock/product-form";
import StockPanel from "@/components/sock/stock-panel";
import StockTable from "@/components/sock/stock-table";

const page = () => {
  return (
    <div className="h-full flex items-center mx-auto max-h-full w-full justify-center flex-wrap p-6 overflow-auto">
      <StockTable />
      <StockPanel>
        <ProductForm />
      </StockPanel>
    </div>
  );
};

export default page;
