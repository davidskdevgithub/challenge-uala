import { useState, useMemo } from 'react';
import { useQueryTransactions } from './useQueryTransactions';

import { Periods } from '../transactions.types';
import { FilterType } from '../filters/filters.types';

import { getTransactionsTotalByPeriod } from '../utils/transactions.period';
import { filterMethods } from '../filters/utils/filters.method';

import { useTransactionsStore } from '../store/transactions-store';
import { useFiltersStore } from '../filters/store/filters-store';

export const useTransactions = () => {
  const isInitialized = useTransactionsStore(state => state.isInitialized);
  const setAllData = useTransactionsStore(state => state.setAllData);
  const transactions = useTransactionsStore(state =>
    state.getAllTransactions(),
  );

  const [activePeriod, setActivePeriod] = useState<Periods>(Periods.WEEKLY);

  const { isLoading, error, refetch } = useQueryTransactions({
    enabled: !isInitialized,
    onSuccess: data => {
      if (data) setAllData(data);
    },
  });

  const totalAmount = useMemo(() => {
    const transactionsByPeriod =
      getTransactionsTotalByPeriod[activePeriod](transactions);

    return transactionsByPeriod.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  }, [transactions, activePeriod]);

  const filtersToApply = useFiltersStore(state => state.toApply);
  const transactionsFiltered = useMemo(() => {
    let filteredTransactions = [...transactions];

    for (const filterType of Object.keys(filtersToApply) as FilterType[]) {
      const values = filtersToApply[filterType];
      if (values && values.length > 0) {
        filteredTransactions = filterMethods[filterType](
          filteredTransactions,
          values,
        );
      }
    }

    return filteredTransactions;
  }, [transactions, filtersToApply]);

  return {
    transactions,
    transactionsFiltered,
    totalAmount,

    isLoading: isLoading || !isInitialized,
    error,
    refetch,

    activePeriod,
    setActivePeriod,
  };
};
