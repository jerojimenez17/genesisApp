import React from "react";
import { auth, signOut } from "@/auth";

const SettingPage = async () => {
  const session = await auth();
  return (
    <div className="h-full flex items-center mx-auto w-full justify-center flex-col max-h-full">
      <div className="w-1/2 flex h-1/2 bg-gray backdrop-filter shadow-lg my-auto backdrop-blur-2xl items-center rounded-lg font-semibold">
        <p className="text-lg text-center mx-auto">👷‍♂️ Estamos Trabajando...</p>
      </div>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit" className="bg-blue-200 p-2">
          Cerrar Sesion
        </button>
      </form>
    </div>
  );
};

export default SettingPage;
