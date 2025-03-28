"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import Builder from "./Builder";

function FormBuilder() {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <SidebarProvider
        open={isSideBarOpen}
        onOpenChange={setIsSidebarOpen}
        className="h-[calc(100vh-64px)]"
        style={
          {
            "--sidebar-width": "300px",
            "--sidebar-heigth:": "40px",
          } as React.CSSProperties
        }
      >
        <Builder {...{ isSideBarOpen }} />
      </SidebarProvider>
    </div>
  );
}

export default FormBuilder;
