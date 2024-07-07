"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import ProductForm from "./product-form";
import StockTable from "./stock-table";
import StockFilterPanel from "./stock-filter-panel";

const ProductDashboad = () => {
  const [openModal, setOpenModal] = useState(false);
  const [descriptionFilter, setDescriptionFilter] = useState("");
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
      <StockFilterPanel
        handleDescriptionFilter={(filter: string) =>
          setDescriptionFilter(filter)
        }
        handleOpenModal={() => setOpenModal(!openModal)}
      />
      <StockTable descriptionFilter={descriptionFilter} />
    </div>
  );
};

export default ProductDashboad;
