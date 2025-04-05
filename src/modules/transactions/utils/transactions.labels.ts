import { PaymentMethodValue, Periods } from '../transactions.types';

export const labelsPaymentMethod: Record<PaymentMethodValue, string> = {
  [PaymentMethodValue.LINK]: 'Link de pago',
  [PaymentMethodValue.QR]: 'Código QR',
  [PaymentMethodValue.MPOS]: 'mPOS',
  [PaymentMethodValue.POSPRO]: 'POS Pro',
};

export const labelsPeriod: Record<Periods, string> = {
  [Periods.DAILY]: 'Diario',
  [Periods.WEEKLY]: 'Semanal',
  [Periods.MONTHLY]: 'Mensual',
};
