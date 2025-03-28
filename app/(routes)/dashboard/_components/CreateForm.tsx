"use client";

import { createForm } from "@/actions/form.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function CreateForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),

    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await createForm({
        name: values.name,
        description: values.description,
      });

      if (response.success) {
        setIsOpen(false);

        router.push(`/dashboard/form/builder/${response.form?.formId}`);
      } else
        alert(response.message || "Something went wrong, please try again.");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="!bg-primary !font-medium gap-1 cursor-pointer hover:ring translate-all duration-350">
            <PlusIcon />
            Create New Form
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className="bg-white">
          <div className="w-full max-w-5xl mx-auto">
            <SheetHeader>
              <SheetTitle>Create New Form</SheetTitle>
              <SheetDescription>
                You are now creating a new form to share with your recipients.
                Please ensure all details are provided.
              </SheetDescription>
            </SheetHeader>

            <div className="w-full dialog-content">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            placeholder="Form Name"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            autoComplete="off"
                            placeholder="Form Name"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="px-5 flex place-self-end !bg-primary"
                  >
                    {form.formState.isSubmitting && (
                      <Loader className="size-4 animate-spin" />
                    )}
                    Create New Form
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CreateForm;
