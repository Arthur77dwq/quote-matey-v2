import { Api } from '.';

export async function apiJson<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await Api(input, init);

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  return (await res.json()) as T;
}
