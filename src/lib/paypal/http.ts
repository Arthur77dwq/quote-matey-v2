const getAccessToken = async () => {
  const isLive = process.env.PAYPAL_ENV === 'live';

  const clientId = isLive
    ? process.env.PAYPAL_LIVE_CLIENT_ID!
    : process.env.PAYPAL_SANDBOX_CLIENT_ID!;

  const clientSecret = isLive
    ? process.env.PAYPAL_LIVE_CLIENT_SECRET!
    : process.env.PAYPAL_SANDBOX_CLIENT_SECRET!;

  const baseUrl = isLive
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();

  return {
    accessToken: data.access_token,
    baseUrl,
  };
};

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export async function paypalHttp<TResponse, TBody = unknown>(
  path: string,
  method: HttpMethod,
  body?: TBody,
): Promise<TResponse> {
  const { accessToken, baseUrl } = await getAccessToken();

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`PayPal API Error: ${error}`);
  }

  return res.json() as Promise<TResponse>;
}
