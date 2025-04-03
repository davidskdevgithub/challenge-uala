import { PaymentMethodValue } from '../transactions.types';

export const labelsPaymentMethod: Record<PaymentMethodValue, string> = {
  [PaymentMethodValue.LINK]: 'Link de pago',
  [PaymentMethodValue.QR]: 'Código QR',
  [PaymentMethodValue.MPOS]: 'mPOS',
  [PaymentMethodValue.POSPRO]: 'POS Pro',
};
