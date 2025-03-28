import { PropsWithChildren } from "react";
import SideMenu from "../_components/_common/SideMenu";

function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full">
      <div className="flex w-[45px] relative">
        <SideMenu />
      </div>

      <main className="w-full flex-1">{children}</main>
    </div>
  );
}

export default layout;
