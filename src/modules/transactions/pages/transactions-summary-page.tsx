import { TransactionList } from '../components/transaction-list';

export const TransactionsSummaryPage = () => {
  return (
    <main className="container w-md mx-auto" tabIndex={-1}>
      <TransactionList />
    </main>
  );
};
