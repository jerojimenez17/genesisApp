import StockTable from "@/components/sock/stock-table";

const page = () => {
  return (
    <div className="flex flex-col h-full w-full items-center overflow-auto">
      <StockTable />
    </div>
  );
};

export default page;
