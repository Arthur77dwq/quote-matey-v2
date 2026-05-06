import { Product } from '@/constant/paypal/product';
import {
  CreatePaypalProductBody,
  PaypalProductResponse,
} from '@/types/paypal/product';

import { paypalHttp } from './http';

export async function createProduct() {
  const data = await paypalHttp<PaypalProductResponse, CreatePaypalProductBody>(
    '/v1/catalogs/products',
    'POST',
    Product,
  );

  return data.id;
}
