'use client';

import { UploadButton } from '../lib/uploadthing';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        className="ut-button:bg-black dark:ut-button:bg-white ut-button:text-white dark:ut-button:text-black"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res);
          alert('Upload Completed');
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
