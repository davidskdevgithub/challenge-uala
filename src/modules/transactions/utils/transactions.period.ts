import { Periods, Transaction } from '../transactions.types';

interface getTransactionsByDateRangeProps {
  transactions: Transaction[];
  startDate: Date;
  endDate: Date;
}

export const getTransactionsByDateRange = ({
  transactions,
  startDate,
  endDate,
}: getTransactionsByDateRangeProps): Transaction[] => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.createdAt);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

export const getDailyTransactions = (
  transactions: Transaction[],
): Transaction[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return getTransactionsByDateRange({
    transactions,
    startDate: today,
    endDate: tomorrow,
  });
};

export const getWeeklyTransactions = (
  transactions: Transaction[],
): Transaction[] => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return getTransactionsByDateRange({
    transactions,
    startDate: startOfWeek,
    endDate: endOfWeek,
  });
};

export const getMonthlyTransactions = (
  transactions: Transaction[],
): Transaction[] => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return getTransactionsByDateRange({
    transactions,
    startDate: startOfMonth,
    endDate: endOfMonth,
  });
};

export const getTransactionsTotalByPeriod = {
  [Periods.DAILY]: (transactions: Transaction[]): Transaction[] =>
    getDailyTransactions(transactions),
  [Periods.WEEKLY]: (transactions: Transaction[]): Transaction[] =>
    getWeeklyTransactions(transactions),
  [Periods.MONTHLY]: (transactions: Transaction[]): Transaction[] =>
    getMonthlyTransactions(transactions),
};
