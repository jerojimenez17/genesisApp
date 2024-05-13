import React from "react";
import { auth, signOut } from "@/auth";

const SettingPage = async () => {
  const session = await auth();
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 flex-col">
      <div className="w-1/2 flex h-1/2 bg-white items-center rounded-lg font-semibold">
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
