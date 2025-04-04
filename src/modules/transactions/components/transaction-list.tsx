import { useMemo } from 'react';

import { TransactionItem } from './transaction-item';
import { useTransactions } from '../hooks/useTransactions';

export const TransactionList = () => {
  const { transactions, isLoading, error } = useTransactions();

  const MemoizedTransactions = useMemo(() => {
    return transactions.map(transaction => (
      <li key={transaction.id} data-testid="transaction-list-item">
        <TransactionItem
          paymentMethodValue={transaction.paymentMethod}
          category="Venta"
          amount={transaction.amount}
          createdAt={transaction.createdAt}
        />
      </li>
    ));
  }, [transactions]);

  if (isLoading) {
    return <div data-testid="loading-state">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error-state">Error: {error.message}</div>;
  }

  return (
    <section
      aria-labelledby="transactions-heading"
      data-testid="transactions-section"
    >
      <h2
        id="transactions-heading"
        className="pl-2"
        data-testid="transactions-heading"
      >
        Historial de Transacciones
      </h2>
      <ul
        className="flex flex-col divide-y divide-neutral-border list-none p-0 mt-2 mx-0 mb-0"
        role="list"
        data-testid="transactions-list"
      >
        {MemoizedTransactions}
      </ul>
    </section>
  );
};
