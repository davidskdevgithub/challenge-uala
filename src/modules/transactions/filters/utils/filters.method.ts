import { FilterType } from '../filters.types';
import { Transaction, CardValue } from '../../transactions.types';

const filterTransactionsByCards = (
  transactions: Transaction[],
  cards: CardValue[],
): Transaction[] => {
  if (cards.length === 0) {
    return transactions;
  }

  return transactions.filter(transaction => cards.includes(transaction.card));
};

export const filterMethods = {
  [FilterType.CARD]: (transactions: Transaction[], values: CardValue[]) =>
    filterTransactionsByCards(transactions, values),
};
