import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { NavigationMenu } from "./ui/navigation-menu";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}
export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {label === "Stock" ? (
        <h1 className="text-3xl font-semibold">🛍️ Nuevo Producto</h1>
      ) : (
        <h1 className={cn("text-3xl font-semibold")}>🔐Papelera Genesis</h1>
      )}
      {label !== "Stock" && (
        <p className="text-muted-foreground text-sm">{label}</p>
      )}
    </div>
  );
};
