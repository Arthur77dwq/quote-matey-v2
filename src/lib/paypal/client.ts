import { Client, Environment } from '@paypal/paypal-server-sdk';

if (!process.env.PAYPAL_ENV) {
  throw new Error('PAYPAL_ENV is not set');
}

const isLive = process.env.PAYPAL_ENV === 'live';

const clientId = isLive
  ? process.env.PAYPAL_LIVE_CLIENT_ID!
  : process.env.PAYPAL_SANDBOX_CLIENT_ID!;

const clientSecret = isLive
  ? process.env.PAYPAL_LIVE_CLIENT_SECRET!
  : process.env.PAYPAL_SANDBOX_CLIENT_SECRET!;

export const paypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: clientId,
    oAuthClientSecret: clientSecret,
  },

  environment: isLive ? Environment.Production : Environment.Sandbox,
});
