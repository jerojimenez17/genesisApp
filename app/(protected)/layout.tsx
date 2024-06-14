import { NavigationMenuHeader } from "@/components/ui/NavBar";
import { NavigationMenu } from "@/components/ui/navigation-menu";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col max-h-full items-center justify-center">
      {/*bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-200 to-emerald-400}*/}
      <NavigationMenuHeader />
      {children}
    </div>
  );
};
export default HomeLayout;
