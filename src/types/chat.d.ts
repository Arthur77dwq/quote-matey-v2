export type Message = {
  content: string;
  id: string;
  role: string;
};

export type Part = {
  text: string;
};

export type ApiError = {
  status?: number;
};
