import { Message, Part } from '@/types/chat';
import { PreviewFile } from '@/types/global';

export const prepareParts = (
  images: PreviewFile[] | null,
  videos: PreviewFile[] | null,
  text: string | null,
) => {
  const parts: Part[] = [];

  if (text) parts.push({ text: text });
  if (images !== null && images.length > 0)
    parts.push(
      ...images.map((image) => ({
        inlineData: {
          mimeType: 'image/jpeg',
          data: image.base64,
        },
      })),
    );

  // VIDEO NOT SUPPORTED YET
  if (videos !== null && videos.length > 0)
    parts.push(
      ...videos.map((video) => ({
        inlineData: {
          mimeType: 'video/mp4',
          data: video.base64,
        },
      })),
    );

  return parts;
};

export const prepareMessage = ({
  text,
  files,
}: {
  text?: string | null;
  files?: PreviewFile[] | null;
}) => {
  text = text ? text.trim() : null;
  files = files && files.length > 0 ? files : null;

  if (text === null && files === null) {
    throw new Error('Message must contain text or files');
  }

  const message: Message = {
    role: 'user',
    parts: prepareParts(files, null, text),
  };
  return message;
};
