import { fetchFormStats } from "@/actions/form.action";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import StatsCard from "./_components/StatsCard";
import { Separator } from "@/components/ui/separator";

function Page() {
  return (
    <div className="w-full pt-8">
      <div className="w-full max-w-6xl mx-auto pt-1 px-2 md:px-0">
        <section className="stats-section w-full">
          <div className="flex items-center justify-between py-5 w-full">
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>

            <Button className="!bg-primary !font-medium gap-1">
              <PlusIcon />
              Create New Form
            </Button>
          </div>

          <StatsListWrap />
        </section>

        <div className="mt-10">
          <Separator className="!border-[#eee] !bg-[#eee]" />
        </div>

        <section className="w-full pt-7 pb-10">
          <div className="w-full flex items-center mb-4">
            <h5 className="text-xl font-semibold tracking-tight">All Forms</h5>
          </div>

          <div className="flex items-center justify-center">
            No Forms Created
          </div>
        </section>
      </div>
    </div>
  );
}

async function StatsListWrap() {
  const stats = await fetchFormStats();

  return <StatsCard loading={false} data={stats} />;
}

export default Page;
