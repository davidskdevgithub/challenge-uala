import IconStore from '@/components/icons/icon-store';
import { PaymentMethodValue } from '../transactions.types';

import { labelsPaymentMethod } from '../utils/transactions.labels';
import { formatCurrencyToEs } from '@/formatters/format-currency';
import { formatDateToEs } from '@/formatters/format-date';

export interface TransactionItemProps {
  paymentMethodValue: PaymentMethodValue;
  category: string;
  amount: number;
  createdAt: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  paymentMethodValue,
  category,
  amount,
  createdAt,
}) => {
  const { full: formattedAmount } = formatCurrencyToEs(amount);
  const formattedDate = formatDateToEs(createdAt);

  return (
    <article className="py-3 px-2 flex items-center gap-2 text-sm">
      <div className="flex-shrink-0" aria-hidden="true">
        <IconStore />
      </div>
      <div className="flex-grow flex flex-col gap-1">
        <p
          className="font-semibold text-neutral-hard"
          data-testid="payment-method"
        >
          {labelsPaymentMethod[paymentMethodValue]}
        </p>
        <p className="text-neutral" data-testid="category">
          {category}
        </p>
      </div>
      <div className="text-right flex flex-col gap-1">
        <p
          className="font-semibold text-success"
          aria-label={`Amount: ${formattedAmount} pesos`}
          data-testid="amount"
        >
          +${formattedAmount}
        </p>
        <p
          className="text-neutral"
          aria-label={`Date: ${formattedDate}`}
          data-testid="date"
        >
          {formattedDate}
        </p>
      </div>
    </article>
  );
};
