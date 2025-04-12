import { useMemo } from 'react';

import { TransactionItem } from './transaction-item';
import { Transaction } from '../transactions.types';

import { Skeleton } from '@/components/ui/skeleton';
import IconEmptySearch from '@/components/icons/icon-empty-search';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading,
  error,
}) => {
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
    return Array.from({ length: 10 }).map((_, index) => (
      <div key={index} className="flex items-center gap-2 px-2 mb-3">
        <Skeleton className="w-10 h-10 rounded-2xl" />
        <Skeleton className="w-full h-10 rounded-full" />
      </div>
    ));
  }

  if (error) {
    return <div data-testid="error-state">Error: {error.message}</div>;
  }

  if (transactions.length === 0) {
    return (
      <div
        className="w-xs mx-auto flex flex-col items-center gap-4 py-8 text-center"
        data-testid="empty-transactions"
      >
        <IconEmptySearch />
        <p className="text-neutral text-sm font-light leading-[140%]!">
          No hay resultados que mostrar. Podés probar usando los filtros.
        </p>
      </div>
    );
  }

  return (
    <ul
      className="flex flex-col divide-y divide-neutral-border list-none p-0 mt-2 mx-0 mb-0"
      role="list"
      data-testid="transactions-list"
    >
      {MemoizedTransactions}
    </ul>
  );
};
