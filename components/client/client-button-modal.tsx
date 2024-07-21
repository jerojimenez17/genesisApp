"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/Modal";
import ClientForm from "./client-form";

const ClientButtonModal = () => {
  const [openNewClientModal, setOpenNewClientModal] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setOpenNewClientModal(true);
        }}
        className="bg-green-400 hover:bg-emerald-600 bg-opacity-65 rounded-full"
      >
        Nuevo Cliente
      </Button>
      <Modal
        visible={openNewClientModal}
        onClose={() => setOpenNewClientModal(false)}
        blockButton={false}
      >
        <ClientForm />
      </Modal>
    </div>
  );
};

export default ClientButtonModal;
