'use client';

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function BlobDisplay() {
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


  return (
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
            Download image
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}