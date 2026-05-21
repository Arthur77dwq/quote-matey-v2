type ApiJsonOptions = RequestInit & {
  token?: string;
};

import { Api } from '.';

export async function apiJson<T>(
  input: RequestInfo,
  init?: ApiJsonOptions,
): Promise<T> {
  const { token, headers, ...rest } = init || {};

  const normalizedHeaders =
    headers instanceof Headers
      ? Object.fromEntries(headers.entries())
      : Array.isArray(headers)
        ? Object.fromEntries(headers)
        : headers || {};

  const res = await Api(input, {
    ...rest,
    headers: {
      ...normalizedHeaders,
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
  });

  return (await res.json()) as T;
}
