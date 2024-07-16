"use client";
// const NavBar = () => {
//   return (
//     <div className="flex mx-auto opacity-90 shadow h-14 w-full justify-between px-4 py-5">
//       <section className="flex justify-between">
//         <span className="text-white font-bold text-2xl">Genesis</span>
//       </section>
//       <ul className="justify-center flex flex-grow">
//         <li className="justify-center items-center hover:shadow-inner hover:shadow-white py-2 align-baseline">
//           <Link href="/stock">
//             <p className="text-center text-white font-semibold ">Stock</p>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default NavBar;

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { auth } from "@/auth";
import { Session } from "next-auth";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Cargar Productos",
    href: "/stock/newproduct",
    description: "Agrega nuevos productos a tu stock",
  },
  {
    title: "🆕Tabla de Productos",
    href: "/stock/productsDashboard",
    description: "Administra los productos de tu stock",
  },
];
const componentsPedidos: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "🆕Pedidos",
    href: "/orders",
    description: "Chequea y administra tus pedidos",
  },
];
interface props {
  session: Session;
}

export function NavigationMenuHeader({ session }: props) {
  return (
    <div className="w-screen flex justify-center shadow align-middle">
      <div className="flex flex-grow">
        <span className="text-center text-2xl font-semibold text-white mx-6 my-2">
          Genesis
        </span>
      </div>
      <NavigationMenu className="my-1 p-1">
        <NavigationMenuList>
          <NavigationMenuItem className="">
            <NavigationMenuTrigger className="backdrop-filter backdrop-blur-xl bg-gray font-bold text-white hover:bg-gray hover:backdrop-filter hover:backdrop-blur ">
              Stock
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    className="font-semibold"
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-gray backdrop-filter backdrop-blur-xl font-bold text-white hover:bg-gray hover:backdrop-filter hover:backdrop-blur-lg">
              Pedidos
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {componentsPedidos.map((component) => (
                  <ListItem
                    className="font-bold text-lg"
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex flex-grow text-center align-middle justify-end">
        <span></span>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
