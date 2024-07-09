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
import { toast } from "sonner"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageDown } from "lucide-react";



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

      fetch(`https://aggregator-devnet.walrus.space/v1/${blobId}`).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
      });

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
    <div className="flex flex-col items-center px-4 py-4">
      <div className="w-full flex flex-col items-start">
        <h1 className="text-4xl font-medium">
          Walrus View Blob
        </h1>
        <p>
          An example searching and display images using the Walrus API.
        </p>
      </div>
      <div className="w-full flex flex-col items-center lg:gap-4 lg:flex-row lg:justify-around ">
        <div className="flex flex-col items-start w-full lg:max-w-lg py-8 gap-4">
          <h2 className="text-2xl font-medium">
            Search blobs
          </h2>
          <p className="max-w-prose">
            Upload blobs to Walrus, and display them on this page. See the Walrus documentation for more information. The file size is limited to 10 MiB on the default publisher. Use the CLI tool to store bigger files.
          </p>
          <Form {...form}>
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
        {
          blobId && (
            <Card className="w-full max-w-lg h-full">
              <Image 
                className="p-1 w-full h-full object-contain rounded-lg"
                src={`https://aggregator-devnet.walrus.space/v1/${blobId}`}
                alt="Blob image"
                width={200}
                height={200}
                onError={() => {
                  toast.error("Blob not found. Please try a valid blob id.")
                  setBlobId(null);
                }}
              />
              <CardFooter>
                <a href={`https://aggregator-devnet.walrus.space/v1/${blobId}`} className="w-full">
                  <Button className="w-full" variant={'secondary'}>
                    Download
                  </Button>
                </a>
              </CardFooter>
            </Card>
          )
        }
      </div>
    </div>
  );
}
