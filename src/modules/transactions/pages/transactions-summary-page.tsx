import IconDownload from '@/components/icons/icon-download';

import { TransaccionTotalPeriod } from '../components/transaction-totals-period';
import { TransactionList } from '../components/transaction-list';
import { useTransactions } from '../hooks/useTransactions';

import { FiltersDrawer } from '../filters/components/filters-drawer';

export const TransactionsSummaryPage = () => {
  const {
    transactionsFiltered,
    totalAmount,
    isLoading,
    error,
    activePeriod,
    setActivePeriod,
  } = useTransactions();

  return (
    <main
      className="container w-xs md:w-md mx-auto flex flex-col items-stretch gap-8"
      tabIndex={-1}
    >
      <TransaccionTotalPeriod
        activePeriod={activePeriod}
        onChangeActivePeriod={setActivePeriod}
        totalAmount={totalAmount}
        isLoading={isLoading}
        error={error}
      />
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
          <div className="flex md:gap-2" aria-label="Transaction actions">
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
        <TransactionList
          transactions={transactionsFiltered}
          isLoading={isLoading}
          error={error}
        />
      </section>
    </main>
  );
};
