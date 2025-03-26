"use client";

import Logo from "@/components/logo/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  useKindeBrowserClient,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown, LogOutIcon } from "lucide-react";

function Header() {
  const pathname = usePathname();
  const { formId } = useParams();

  const { user } = useKindeBrowserClient();

  const NAV_MENUS = [
    { name: "Dashboard", pathname: "/dashboard", isDisabled: false },
    {
      name: "Builder",
      pathname: `/dashboard/form/builder/${formId}`,
      isDisabled: true,
    },
    {
      name: "Responds",
      pathname: `/dashboard/form/responds/${formId}`,
      isDisabled: true,
    },
    {
      name: "Settings",
      pathname: "/dashboard/settings",
      isDisabled: false,
    },
  ];

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 !bg-[#ff6448] px-8 md:px-16">
      <nav className="gap-6 h-full w-full text-lg font-medium flex justify-between">
        <div className="flex flex-1 items-center mr-5 pr-8 border-r border-gray-600">
          <Logo url="/dashboard" />
          <span className="sr-only">Formake</span>
        </div>

        <ul className="hidden md:flex flex-row">
          {NAV_MENUS.map((menu) => (
            <li key={menu.name} className="relative h-full">
              {pathname === menu.pathname && (
                <div className="absolute top-0 left-0 right-0 h-[52px] bg-orange-300 opacity-50 transition-colors ease-in-out rounded-b-xl -z-[1]" />
              )}

              <Link
                href={menu.pathname}
                className={cn(
                  "text-white/90 text-[15.5px] hover:text-white font-bold z-[999] flex items-center px-3 justify-center h-full transition-colors duration-200",
                  { "opacity-80 pointer-events-none": menu.isDisabled }
                )}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 justify-end w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div role="button" className="flex items-start gap-2">
                <Avatar className="size-8 bg-gray-200 shrink-0 rounded-full">
                  <AvatarImage
                    src={user?.picture || ""}
                    alt={user?.given_name || "user"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.given_name?.charAt(0)}
                    {user?.family_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-2">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-[#f2f2f2]">
                      {user?.given_name} {user?.family_name}
                    </span>

                    <p className="truncate block w-full max-w-[150px] text-xs text-white/50">
                      {user?.email}
                    </p>
                  </div>
                  <ChevronDown className="ml-auto size-4 text-white" />
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>
                <LogoutLink className="flex items-center gap-1">
                  <LogOutIcon className="size-4" />
                  Logout
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

export default Header;
