export async function Api(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, {
    ...init,
    credentials: 'include',
    headers: {
      ...(init?.headers || {}),
      'Content-Type': 'application/json',
      method: init?.method || 'GET',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'API request failed');
  }

  return res;
}
