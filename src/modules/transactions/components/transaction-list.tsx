import { useMemo } from 'react';

import { TransactionItem } from './transaction-item';
import { Transaction } from '../transactions.types';

import IconDownload from '@/components/icons/icon-download';

import { FiltersDrawer } from '../filters/components/filters-drawer';

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
      <div className="flex items-center justify-between">
        <h2
          id="transactions-heading"
          className="pl-2 text-sm font-semibold text-neutral-hard"
          data-testid="transactions-heading"
        >
          Historial de Transacciones
        </h2>
        <div className="flex gap-2" aria-label="Transaction actions">
          <div className="w-12 h-12 flex items-center justify-center">
            <FiltersDrawer />
          </div>
          <div className="w-12 h-12 flex items-center justify-center">
            <button
              aria-label="Download transactions"
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
            >
              <IconDownload aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
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
