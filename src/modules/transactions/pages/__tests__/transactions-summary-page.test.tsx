import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Periods } from '../../transactions.types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as useTransactionsModule from '../../hooks/useTransactions';

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
  let TransactionsSummaryPage: React.ComponentType;
  let useTransactionsSpy: ReturnType<typeof vi.spyOn>; // Declare the spy with Vitest type
  const defaultTransactions = {
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
    transactionsFiltered: [
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
    totalAmount: 3500,
    isLoading: false,
    error: null,
    activePeriod: Periods.WEEKLY,
    setActivePeriod: vi.fn(),
  };

  beforeAll(async () => {
    //Import component
    const module = await import('../transactions-summary-page');
    TransactionsSummaryPage = module.TransactionsSummaryPage;
  });

  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test

    // Spy on the useTransactions hook
    useTransactionsSpy = vi.spyOn(useTransactionsModule, 'useTransactions');

    // Set the default return value for the spy
    useTransactionsSpy.mockReturnValue(defaultTransactions);
  });

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
    expect(totalAmount.textContent).toBe('3500');
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

  it('renders filtered transactions correctly', () => {
    // Override the mock for this test
    useTransactionsSpy.mockReturnValue({
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
      transactionsFiltered: [
        {
          id: '1',
          paymentMethod: 'link',
          amount: 1500,
          createdAt: '2025-01-01T12:00:00Z',
        },
      ],
      totalAmount: 1500, // Corrected total amount
      isLoading: false,
      error: null,
      activePeriod: Periods.WEEKLY,
      setActivePeriod: vi.fn(),
    });

    render(<TransactionsSummaryPage />, { wrapper: createWrapper() });

    const transactionList = screen.getByTestId('transaction-list');
    expect(transactionList).toBeDefined();

    const transactionsCount = screen.getByTestId('transactions-count');
    expect(transactionsCount.textContent).toBe('1'); // Only one transaction after filtering
  });
});
