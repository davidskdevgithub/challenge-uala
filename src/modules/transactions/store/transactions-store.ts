import { create } from 'zustand';

import {
  Transaction,
  PaymentMethod,
  Card,
  TransactionsResponse,
} from '../transactions.types';

export interface TransactionsState {
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
  cards: Card[];
  isInitialized: boolean;

  setAllData: (data: TransactionsResponse) => void;

  getAllTransactions: () => Transaction[];
  getPaymentMethods: () => PaymentMethod[];
  getCards: () => Card[];
}

export const useTransactionsStore = create<TransactionsState>()((set, get) => ({
  transactions: [],
  paymentMethods: [],
  cards: [],
  isInitialized: false,

  setAllData: (data: TransactionsResponse) =>
    set({
      transactions: data.transactions,
      paymentMethods: data.metadata.paymentMethods,
      cards: data.metadata.cards,
      isInitialized: true,
    }),

  getAllTransactions: () => get().transactions,

  getPaymentMethods: () => get().paymentMethods,

  getCards: () => get().cards,
}));
