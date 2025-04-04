export enum PaymentMethodValue {
  LINK = 'link',
  QR = 'qr',
  MPOS = 'mpos',
  POSPRO = 'pospro',
}

export interface PaymentMethod {
  value: PaymentMethodValue;
  label: string;
}

export enum CardValue {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMEX = 'amex',
}

export interface Card {
  value: CardValue;
  label: string;
}

export interface Transaction {
  id: string;
  amount: number;
  card: CardValue;
  installments: number;
  createdAt: string;
  updatedAt: string;
  paymentMethod: PaymentMethodValue;
}

export interface TransactionsResponse {
  metadata: {
    paymentMethods: PaymentMethod[];
    cards: Card[];
  };
  transactions: Transaction[];
}
