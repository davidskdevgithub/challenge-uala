import { FilterType, FilterValues } from '../filters.types';
import { DateRange } from 'react-day-picker';
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

const filterTransactionsByDate = (
  transactions: Transaction[],
  dateRange: DateRange,
): Transaction[] => {
  const startDate = dateRange.from;
  let endDate = dateRange.to;

  if (!startDate) {
    return transactions;
  }

  if (!endDate) {
    endDate = new Date(startDate);
    endDate.setUTCHours(23, 59, 59, 999); // Set endDate to the end of the day
  }

  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.createdAt);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

export const filterMethods = {
  [FilterType.DATE]: (transactions: Transaction[], values: FilterValues[]) =>
    filterTransactionsByDate(transactions, values[0] as DateRange),
  [FilterType.CARD]: (transactions: Transaction[], values: FilterValues[]) =>
    filterTransactionsByCards(transactions, values as CardValue[]),
};
