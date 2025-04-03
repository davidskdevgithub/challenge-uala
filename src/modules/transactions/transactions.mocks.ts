import {
  Transaction,
  CardValue,
  PaymentMethodValue,
} from './transactions.types';

export const mockTransactions: Transaction[] = [
  {
    id: '15ed36b8-5fec-489a-9617-584cf35541ea',
    amount: 1393.71,
    card: CardValue.AMEX,
    installments: 1,
    createdAt: '2025-01-01T06:48:03Z',
    updatedAt: '2025-01-01T07:26:03Z',
    paymentMethod: PaymentMethodValue.LINK,
  },
  {
    id: 'db678985-5c3d-4b7a-8b08-d2e20fea9a0d',
    amount: 1393.13,
    card: CardValue.VISA,
    installments: 3,
    createdAt: '2025-01-02T07:46:09Z',
    updatedAt: '2025-01-02T08:15:09Z',
    paymentMethod: PaymentMethodValue.MPOS,
  },
  {
    id: '97d145a7-f31d-41e2-a3a4-824750cc3f85',
    amount: 1073.34,
    card: CardValue.AMEX,
    installments: 6,
    createdAt: '2025-01-03T10:05:25Z',
    updatedAt: '2025-01-03T10:39:25Z',
    paymentMethod: PaymentMethodValue.MPOS,
  },
];
