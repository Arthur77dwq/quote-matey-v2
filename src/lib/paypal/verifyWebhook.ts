import { paypalHttp } from './http';
import { PaypalWebhookEvent } from './schema';

export async function verifyPaypalWebhook(params: {
  headers: Record<string, string>;
  body: PaypalWebhookEvent;
  webhookId: string;
}) {
  const { headers, body, webhookId } = params;

  const response = await paypalHttp<{
    verification_status: 'SUCCESS' | 'FAILURE';
  }>('/v1/notifications/verify-webhook-signature', 'POST', {
    auth_algo: headers['paypal-auth-algo'],
    cert_url: headers['paypal-cert-url'],
    transmission_id: headers['paypal-transmission-id'],
    transmission_sig: headers['paypal-transmission-sig'],
    transmission_time: headers['paypal-transmission-time'],
    webhook_id: webhookId,
    webhook_event: body,
  });

  return response.verification_status === 'SUCCESS';
}
