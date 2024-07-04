import React from "react";
import { Button } from "../ui/button";

interface props {
  handleOpenModal: () => void;
}
const StockFilterPanel = ({ handleOpenModal }: props) => {
  return (
    <div className="h-28 w-3/4 flex items-center justify-center bg-white bg-opacity-45 shadow rounded-lg mx-auto my-2">
      <Button
        className="rounded-full h-10 p-1 m-2 hover:font-bold target:bg-blue-400"
        onClick={handleOpenModal}
      >
        ➕Nuevo Producto
      </Button>
    </div>
  );
};

export default StockFilterPanel;
