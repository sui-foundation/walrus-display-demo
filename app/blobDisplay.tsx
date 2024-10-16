'use client';

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function BlobDisplay() {
  const searchParams = useSearchParams()

  const blobId = searchParams.get('blobId') || null;

  if (!blobId) {
    return null;
  }


  return (
    <Card className="w-full max-w-lg h-full">
      <img 
        className="p-1 w-full h-full object-contain rounded-lg"
        src={`https://aggregator.walrus-testnet.walrus.space/v1/${blobId}`}
        alt="Blob image"
        width={200}
        height={200}
        onError={() => {
          toast.error("Blob not found. Please try a valid blob id.")
        }}
      />
      <CardFooter>
        <a href={`https://aggregator.walrus-testnet.walrus.space/v1/${blobId}`} className="w-full">
          <Button className="w-full" variant={'secondary'}>
            Download image
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}