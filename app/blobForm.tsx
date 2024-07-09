'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Form } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  blobId: z.string(),
});

export default function BlobForm() {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blobId: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {

    console.log(values);

    window.location.href = `/?blobId=${values.blobId}`
  }

  return (
    <div className="flex flex-col items-start w-full lg:max-w-lg py-8 gap-4">
      <h2 className="text-2xl font-medium">
        Search blobs
      </h2>
      <p className="max-w-prose">
        Search Walrus blobs by ID, and display them on this page. See the <a href="https://docs.walrus.site/usage/web-api.html#public-services" target="_blank" className="text-blue-500 underline hover:cursor-pointer hover::text-blue-800">Walrus</a> documentation for more information.
      </p>
      <Form {...form} className="w-full">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="blob_id">
              Blob ID
            </Label>
            <Input
              id="blob_id"
              type="text"
              {...form.register("blobId")}
            />
          </div>
          <Button
            type="submit"
          >
            Search
          </Button>
        </form>
      </Form>
    </div>
  )
}