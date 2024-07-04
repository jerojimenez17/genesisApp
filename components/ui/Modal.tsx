"use client";
import React, { ReactElement, useEffect, useState } from "react";

interface props {
  visible: boolean;
  onClose: () => void;
  onAcept: () => void;
  onCancel: () => void;
  blockButton: boolean;
  link?: string;
  message: string;
  children?: ReactElement;
}
const Modal = ({
  link,
  visible,
  onClose,
  children,
  onAcept,
  onCancel,
  blockButton,
}: props) => {
  if (!visible) return null;
  return (
    <div className="mx-auto my-auto flex-col fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className=" flex flex-col h-[90vh]">
        <button
          className="text-white text-xl place-self-end hover:text-pink-300"
          onClick={onClose}
        >
          X
        </button>
        <div className="bg-sky-200 mx-10 align-middle bg-opacity-50 p-2 rounded w-full h-full overflow-auto flex flex-col">
          <div className="m-3 flex flex-col flex-grow mx-auto text-black font-semibold text-lg">
            {children}
          </div>

          <div className="flex w-full h-12 justify-around">
            {/* <button
              disabled={blockButton}
              onClick={onAcept}
              className="p-2 bg-pink-400 text-white font-semibold rounded-2xl hover:shadow-md hover:shadow-pink-200"
            >
              Aceptar
            </button>
            <button
              onClick={onCancel}
              className="p-2 border border-pink-400 text-pink-400 font-semibold rounded-2xl hover:shadow-md hover:shadow-pink-200"
            >
              Cancelar
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
