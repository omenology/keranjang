type parameterSnap = {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  credit_card?: {
    secure?: boolean;
  };
  item_details?: {
    id?: string;
    price?: number;
    quantity?: number;
    name?: string;
    brand?: string;
    category?: string;
    merchant_name?: string;
  }[];
  customer_details?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    billing_address?: address;
    shipping_address: address;
  };
};

type address = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country_code?: string;
};

type options = {
  isProduction: boolean;
  serverKey: string;
  clientKey: string;
};

declare module "midtrans-client" {
  export class Snap {
    appconfig: options;
    constructor(options: options);
    createTransaction(parameter: parameterSnap): Promise<{ token: string; redirect_url: string }>;
    createTransactionToken(parameter: parameterSnap): Promise;
    createTransactionRedirectUrl(parameter: parameterSnap): Promise;
  }

  export default {
    Snap,
  };
}
