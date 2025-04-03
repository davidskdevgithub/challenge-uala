import { TransactionItem } from './transaction-item';
import { mockTransactions } from '../transactions.mocks';

export const TransactionList = () => {
  return (
    <section aria-labelledby="transactions-heading">
      <h2 id="transactions-heading" className="pl-2">
        Historial de Transacciones
      </h2>
      <ul
        className="flex flex-col divide-y divide-neutral-border list-none p-0 mt-2 mx-0 mb-0"
        role="list"
      >
        {mockTransactions.map(transaction => (
          <li key={transaction.id}>
            <TransactionItem
              paymentMethodValue={transaction.paymentMethod}
              category="Venta"
              amount={transaction.amount}
              createdAt={transaction.createdAt}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
