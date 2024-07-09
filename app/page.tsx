import BlobForm from "./blobForm";
import BlobDisplay from "./blobDisplay";
import { Suspense } from "react";
import { Github } from "lucide-react";



export default function Home() {
  


  return (
    <div className="flex flex-col items-center px-4 py-4">
      <a href="https://github.com/sui-foundation/walrus-display-demo" target="_blank">
        <Github className="w-6 h-6 absolute top-2 right-2" />
      </a>
      <div className="w-full flex flex-col items-start">
        <h1 className="text-4xl font-medium">
          Walrus View Blob
        </h1>
        <p>
          An example searching and display images using the Walrus HTTP API.
        </p>
      </div>
      <div className="w-full flex flex-col items-center lg:gap-4 lg:flex-row lg:justify-around ">
        <BlobForm />
        <Suspense fallback={<div>Loading...</div>}>
          <BlobDisplay />
        </Suspense>
      </div>
    </div>
  );
}
