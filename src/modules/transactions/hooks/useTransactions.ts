import { useState } from 'react';
import {
  useTransactionsStore,
  TransactionsState,
} from '../store/transactions-store';
import { useQueryTransactions } from './useQueryTransactions';
import { Periods } from '../transactions.types';

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

  const [activePeriod, setActivePeriod] = useState<Periods>(Periods.WEEKLY);

  const { isLoading, error, refetch } = useQueryTransactions({
    enabled: !isInitialized,
    onSuccess: data => {
      if (data) setAllData(data);
    },
  });

  return {
    transactions,

    isLoading: isLoading || !isInitialized,
    error,
    refetch,

    activePeriod,
    setActivePeriod,
  };
};
