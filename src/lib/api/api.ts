export async function Api(input: RequestInfo, init?: RequestInit) {
  const normalizedHeaders =
    init?.headers instanceof Headers
      ? Object.fromEntries(init.headers.entries())
      : Array.isArray(init?.headers)
        ? Object.fromEntries(init.headers)
        : init?.headers || {};

  const res = await fetch(input, {
    ...init,
    credentials: 'include',
    method: init?.method || 'GET',
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...normalizedHeaders,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();

    throw new Error(errorText || `API request failed (${res.status})`);
  }

  return res;
}
