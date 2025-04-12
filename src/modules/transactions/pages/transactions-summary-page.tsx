import { TransaccionTotalPeriod } from '../components/transaction-totals-period';
import { TransactionList } from '../components/transaction-list';
import { useTransactions } from '../hooks/useTransactions';

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
      <TransactionList
        transactions={transactionsFiltered}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
};
