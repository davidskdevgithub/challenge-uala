import {
  useTransactionsStore,
  TransactionsState,
} from '../store/transactions-store';
import { useQueryTransactions } from './useQueryTransactions';

export const useTransactions = () => {
  const isInitialized = useTransactionsStore(
    (state: TransactionsState) => state.isInitialized,
  );
  const setAllData = useTransactionsStore(
    (state: TransactionsState) => state.setAllData,
  );
  const transactions = useTransactionsStore((state: TransactionsState) =>
    state.getAllTransactions(),
  );

  const { isLoading, error } = useQueryTransactions({
    enabled: !isInitialized,
    onSuccess: data => {
      if (data) setAllData(data);
    },
  });

  return {
    transactions,
    isLoading: isLoading || !isInitialized,
    error,
  };
};
