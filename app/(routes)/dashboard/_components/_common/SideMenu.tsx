"use client";

import { cn } from "@/lib/utils";
import { Blocks, LucideIcon, MessageSquare } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

type NavType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

function SideMenu() {
  const { formId } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const navMenu: NavType[] = [
    {
      title: "Builder",
      url: `/dashboard/form/builder/${formId}`,
      icon: Blocks,
    },
    {
      title: "Responds",
      url: `/dashboard/form/responds/${formId}`,
      icon: MessageSquare,
    },
  ];

  return (
    <div className="fixed h-screen z-40 -ml-1 -mt-1 -mb-1 w-[50px] pt-5 border-r shadow-sm bg-black text-white">
      <ul className="p-0 flex items-center flex-col gap-1">
        {navMenu.map((menu) => {
          return (
            <li key={menu.title}>
              <button
                className={cn(
                  "outline-none p-1 transition-colors ease-in-out hover:bg-white hover:text-black rounded-md",
                  { "bg-white text-black": menu.url === pathname }
                )}
                onClick={() => router.push(menu.url)}
              >
                <menu.icon className="!size-[18px] cursor-pointer" />
                <span className="sr-only">{menu.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideMenu;
