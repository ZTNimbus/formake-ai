import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import BuilderSidebar from "./BuilderSidebar";
import { defaultBackgroundColor } from "@/contants";
import BuilderCanvas from "./BuilderCanvas";
import BuilderBlockProperties from "./BuilderBlockProperties";

interface BuilderProps {
  isSideBarOpen: boolean;
}

function Builder({ isSideBarOpen }: BuilderProps) {
  return (
    <>
      <BuilderSidebar />
      <SidebarInset className="!p-0 flex-1">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: defaultBackgroundColor,
          }}
        >
          <SidebarTrigger className="absolute top-0 z-50" />
          <BuilderCanvas />
        </div>
      </SidebarInset>
      <BuilderBlockProperties />
    </>
  );
}

export default Builder;
