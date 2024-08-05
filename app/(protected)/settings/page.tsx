import React from "react";
import { auth, signOut } from "@/auth";

const SettingPage = async () => {
  const session = await auth();
  return (
    <div className="h-screen flex items-center mx-auto w-full justify-center flex-col max-h-full">
      <div className="w-1/2 flex h-1/2 bg-white bg-opacity-20 backdrop-filter shadow-lg my-auto items-center rounded-lg font-semibold">
        <p className="text-lg text-center mx-auto text-white font-semibold">
          Hola {session?.user.name?.split(" ")[0].toLocaleUpperCase()}👷‍♂️ Estamos
          Trabajando...
        </p>
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
