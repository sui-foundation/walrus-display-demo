'use client';

import Image from "next/image";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


const FormSchema = z.object({
  blobId: z.string(),
});

export default function Home() {
  const searchParams = useSearchParams()

  const [blobId, setBlobId] = useState<string | null>(null);

  useEffect(() => {
    let blobId = searchParams.get('blob_id');
    console.log('blobId', blobId);
    if (blobId) {
      setBlobId(blobId);
    }
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blobId: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {

    console.log(values);

    window.location.href = `/?blob_id=${values.blobId}`
  }

  return (
    <div className="flex flex-col items-start px-16 py-4">
      <h1 className="text-4xl font-medium">
        Walrus View Blob
      </h1>
      <p>
        An example searching and display images using the Walrus API.
      </p>
      <div>
        <h2 className="text-2xl font-medium">
          Search blobs
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="blob_id" className="text-lg">
                Search
              </Label>
              <Input
                id="blob_id"
                type="text"
                {...form.register("blobId")}
                className="p-2 border border-gray-300 rounded-md"
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
      {
        blobId && (
          <div>
            <Image 
              src={`https://aggregator-devnet.walrus.space/v1/${blobId}`}
              alt="Image"
              width={200}
              height={200}
            />
          </div>
        )
      }
    </div>
  );
}
