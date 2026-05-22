import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { PreviewFile } from '@/types/global';

export default function ImagePreview({
  files,
  removeFile,
}: {
  files: PreviewFile[];
  removeFile: (i: number) => void;
}) {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  return (
    <>
      {files.length > 0 && (
        <div className="flex items-center">
          {files.map((file, i) => (
            <div
              // onClick={() => setZoomedIndex(i)}
              key={`${file.name}${i}`}
              className={twMerge(
                'rounded-xl overflow-hidden border',
                zoomedIndex === i
                  ? 'fixed inset-0 top-0 h-screen z-50 bg-black/20 flex justify-center items-center'
                  : 'w-fit relative',
              )}
            >
              <img
                src={file.preview}
                alt={file.name}
                className={twMerge(
                  'object-cover',
                  zoomedIndex === i ? 'size-auto' : 'size-15',
                )}
              />
              {zoomedIndex === i ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedIndex(null);
                  }}
                  className="flex flex-col justify-center items-center absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                >
                  <XIcon className="size-5" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="flex flex-col justify-center items-center absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                >
                  <XIcon className="size-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
