import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionsSummaryPage } from '../transactions-summary-page';
import { Periods } from '../../transactions.types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the useTransactions hook
vi.mock('../../hooks/useTransactions', () => ({
  useTransactions: () => ({
    transactions: [
      {
        id: '1',
        paymentMethod: 'link',
        amount: 1500,
        createdAt: '2025-01-01T12:00:00Z',
      },
      {
        id: '2',
        paymentMethod: 'cash',
        amount: 2000,
        createdAt: '2025-01-02T12:00:00Z',
      },
    ],
    isLoading: false,
    error: null,
    activePeriod: Periods.WEEKLY,
    setActivePeriod: vi.fn(),
  }),
}));

// Mock the TransaccionTotalPeriod component
vi.mock('../../components/transaction-totals-period', () => ({
  TransaccionTotalPeriod: vi.fn().mockImplementation(props => (
    <div data-testid="transaction-totals-period">
      <span data-testid="active-period">{props.activePeriod}</span>
      <span data-testid="total-amount">{props.totalAmount}</span>
      <button
        data-testid="change-period-button"
        onClick={() => props.onChangeActivePeriod(Periods.DAILY)}
      >
        Change Period
      </button>
    </div>
  )),
}));

// Mock the TransactionList component
vi.mock('../../components/transaction-list', () => ({
  TransactionList: vi.fn().mockImplementation(props => (
    <div data-testid="transaction-list">
      <span data-testid="transactions-count">{props.transactions.length}</span>
      <span data-testid="is-loading">{props.isLoading.toString()}</span>
      <span data-testid="has-error">{props.error ? 'true' : 'false'}</span>
    </div>
  )),
}));

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('TransactionsSummaryPage', () => {
  it('renders the main container with correct attributes', () => {
    render(<TransactionsSummaryPage />, { wrapper: createWrapper() });

    const main = screen.getByRole('main');
    expect(main).toBeDefined();
    expect(main.getAttribute('tabIndex')).toBe('-1');
  });

  it('renders the TransaccionTotalPeriod component with correct props', () => {
    render(<TransactionsSummaryPage />, { wrapper: createWrapper() });

    const totalsPeriod = screen.getByTestId('transaction-totals-period');
    expect(totalsPeriod).toBeDefined();

    const activePeriod = screen.getByTestId('active-period');
    expect(activePeriod.textContent).toBe(Periods.WEEKLY);

    const totalAmount = screen.getByTestId('total-amount');
    expect(totalAmount.textContent).toBe('35000');
  });

  it('renders the TransactionList component with correct props', () => {
    render(<TransactionsSummaryPage />, { wrapper: createWrapper() });

    const transactionList = screen.getByTestId('transaction-list');
    expect(transactionList).toBeDefined();

    const transactionsCount = screen.getByTestId('transactions-count');
    expect(transactionsCount.textContent).toBe('2');

    const isLoading = screen.getByTestId('is-loading');
    expect(isLoading.textContent).toBe('false');

    const hasError = screen.getByTestId('has-error');
    expect(hasError.textContent).toBe('false');
  });
});
