import { fetchAllForms, fetchFormStats } from "@/actions/form.action";
import { Separator } from "@/components/ui/separator";
import StatsCard from "./_components/StatsCard";
import CreateForm from "./_components/CreateForm";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import FormItem from "./_components/_common/FormItem";

function Page() {
  return (
    <div className="w-full pt-8">
      <div className="w-full max-w-6xl mx-auto pt-1 px-2 md:px-0">
        <section className="stats-section w-full">
          <div className="flex items-center justify-between py-5 w-full">
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>

            <CreateForm />
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

          <div className="grid gap-4 grid-cols-2 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5">
            <Suspense
              fallback={[1, 2, 3, 4].map((item) => (
                <Loader key={item} className="animate-spin" size="3rem" />
              ))}
            >
              <FormList />
            </Suspense>
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

async function FormList() {
  const { forms } = await fetchAllForms();

  if (!forms?.length)
    return (
      <div className="flex items-center w-full justify-center">
        <span className="text-zinc-700">No Forms Created</span>
      </div>
    );

  return (
    <>
      {forms?.map((form) => (
        <FormItem key={form.id} form={form} />
      ))}
    </>
  );
}

export default Page;
