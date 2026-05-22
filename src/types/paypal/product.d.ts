export type PaypalProductType = 'PHYSICAL' | 'DIGITAL' | 'SERVICE';

export type PaypalProductCategory = 'SOFTWARE' | 'SERVICES';

export interface PaypalLink {
  href: string;
  rel: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
}

export interface PaypalProductResponse {
  id: string; // PROD-XXXX
  name: string;
  description?: string;
  type: PaypalProductType;
  category?: string;

  image_url?: string;
  home_url?: string;

  create_time: string; // ISO date
  update_time: string;

  links: PaypalLink[];
}

export interface CreatePaypalProductBody {
  id?: string;
  name: string;
  description?: string;

  type: PaypalProductType;

  category?: string;

  image_url?: string;
  home_url?: string;
}
