import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            `text-6xl font-semibold text-white drop-shadow-md`,
            font.className
          )}
        >
          🔐Genesis
        </h1>
        <p className="text-white text-lg">
          Inicia sesion para entrar a nuesto sistema
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary">Iniciar Sesion</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
