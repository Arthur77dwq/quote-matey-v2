interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
}

export type Part = {
  text: string;
};

export type ApiError = {
  status?: number;
};
