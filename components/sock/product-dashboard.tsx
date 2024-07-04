"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import ProductForm from "./product-form";
import StockTable from "./stock-table";
import StockFilterPanel from "./stock-filter-panel";

const ProductDashboad = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex flex-col h-full w-full items-center overflow-auto">
      <Modal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        onAcept={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        blockButton={false}
        message={""}
      >
        <ProductForm />
      </Modal>
      <StockFilterPanel handleOpenModal={() => setOpenModal(!openModal)} />
      <StockTable />
    </div>
  );
};

export default ProductDashboad;
