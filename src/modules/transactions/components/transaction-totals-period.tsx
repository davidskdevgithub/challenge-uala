import IconAnalyze from '@/components/icons/icon-analyze';

import { Periods } from '../transactions.types';

import { labelsPeriod } from '../utils/transactions.labels';
import { formatCurrencyToEs } from '@/formatters/format-currency';

interface TransactionTotalsPeriodProps {
  activePeriod: Periods;
  onChangeActivePeriod: (period: Periods) => void;
  totalAmount: number;
  isLoading: boolean;
  error: Error | null;
}

export const TransaccionTotalPeriod: React.FC<TransactionTotalsPeriodProps> = ({
  activePeriod,
  onChangeActivePeriod,
  totalAmount,
  isLoading,
  error,
}) => {
  const { entera, decimal } = formatCurrencyToEs(totalAmount);

  if (isLoading) {
    return <div data-testid="loading-state">Cargando...</div>;
  }

  if (error) {
    return <div data-testid="error-state">Error: {error.message}</div>;
  }

  return (
    <section
      className="flex flex-col justify-center items-center gap-4"
      data-testid="transaction-totals-section"
    >
      <h1 className="w-full text-2xl font-semibold text-neutral-hard pl-12">
        Tus cobros
      </h1>
      <div
        className="w-full flex justify-between items-center text-sm font-light text-neutral"
        role="tablist"
        aria-label="Periodos de transacción"
        data-testid="period-tabs"
      >
        {Object.values(Periods).map(period => (
          <button
            key={period}
            id={`tab-${period}`}
            role="tab"
            aria-selected={activePeriod === period}
            aria-controls={`panel-${period}`}
            className={`w-1/3 h-12 relative ${activePeriod === period ? 'font-semibold pb-3' : ''}`}
            onClick={() => onChangeActivePeriod(period)}
            data-testid={`period-tab-${period}`}
          >
            {labelsPeriod[period]}
            {activePeriod === period && (
              <div
                className="w-2 h-2 rounded-full bg-primary-blue absolute bottom-0 left-1/2 transform -translate-x-1/2"
                aria-hidden="true"
              ></div>
            )}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${activePeriod}`}
        aria-labelledby={`tab-${activePeriod}`}
        data-testid={`period-panel-${activePeriod}`}
      >
        <h2
          className="text-4xl font-light text-neutral-hard"
          data-testid="transaction-amount"
        >
          <span aria-hidden="true">+</span>
          <span>${entera},</span>
          <span className="text-2xl">{decimal}</span>
        </h2>
      </div>
      <a
        href="#"
        className="flex items-center gap-1 h-12 py-2 px-4 text-primary-blue font-normal text-sm hover:underline transition-colors"
        aria-label="Ver análisis de transacciones"
        data-testid="view-analysis-link"
      >
        <IconAnalyze aria-hidden="true" />
        <span>Ver análisis</span>
      </a>
    </section>
  );
};
