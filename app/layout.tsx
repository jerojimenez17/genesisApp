import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import genesisAppIcon from "../public/genesisIcon.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenesisApp",
  description: "Entra en nuestra WebApp!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={
          inter.className + " bg-gradient-to-tr to-blue-400 from-blue-300"
        }
      >
        {children}
      </body>
    </html>
  );
}
