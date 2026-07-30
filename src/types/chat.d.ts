export type ApiError = {
  status?: number;
};

export type TextPart = {
  text: string;
};

export type InlineDataPart = {
  inlineData: {
    mimeType: string;
    data: string;
  };
};

export type Part = TextPart | InlineDataPart;
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'model';
  notification?: {
    info_text: string;
    link_text: string;
  };
  parts: Part[];
}
