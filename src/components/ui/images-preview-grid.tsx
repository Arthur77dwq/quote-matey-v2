import { XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { PreviewFile } from '@/types/global';

export default function ImagePreview({
  files,
  removeFile,
}: {
  files: PreviewFile[];
  removeFile: (i: number) => void;
}) {
  return (
    <>
      {files.length > 0 && (
        <div className="flex items-center">
          {files.map((file, i) => (
            <div
              key={`${file.name}${i}`}
              className={twMerge(
                'w-fit relative rounded-xl overflow-hidden border',
              )}
            >
              <img
                src={file.preview}
                alt={file.name}
                className="size-20 object-cover"
              />

              <button
                onClick={() => removeFile(i)}
                className="flex flex-col justify-center items-center absolute top-2 right-2 bg-black/60 text-white rounded-full size-6"
              >
                <XIcon className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
