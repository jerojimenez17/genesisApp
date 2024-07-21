import { auth } from "@/auth";
import { NavigationMenuHeader } from "@/components/ui/NavBar";
import { NavigationMenu } from "@/components/ui/navigation-menu";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session)
    return (
      <div className="h-full flex flex-col max-h-full items-center justify-center">
        {/*bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-200 to-emerald-400}*/}
        <NavigationMenuHeader session={session} />
        {children}
      </div>
    );
};
export default HomeLayout;
