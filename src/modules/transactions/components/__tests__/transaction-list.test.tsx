import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionList } from '../transaction-list';
import { TransactionItemProps } from '../transaction-item';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a mock function for useTransactions
const mockUseTransactions = vi.fn();

// Mock the useTransactions hook
vi.mock('../../hooks/useTransactions', () => ({
  useTransactions: () => mockUseTransactions(),
}));

// Mock the TransactionItem component
vi.mock('../transaction-item', () => ({
  TransactionItem: ({
    paymentMethodValue,
    category,
    amount,
    createdAt,
  }: TransactionItemProps) => (
    <div data-testid="transaction-item">
      <span data-testid="payment-method">{paymentMethodValue}</span>
      <span data-testid="category">{category}</span>
      <span data-testid="amount">{amount}</span>
      <span data-testid="date">{createdAt}</span>
    </div>
  ),
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

describe('TransactionList', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();

    // Default mock implementation
    mockUseTransactions.mockReturnValue({
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
    });
  });

  it('renders the transaction list with correct heading', () => {
    render(<TransactionList />, { wrapper: createWrapper() });

    const heading = screen.getByTestId('transactions-heading');
    expect(heading.textContent).toBe('Historial de Transacciones');
  });

  it('renders the correct number of transaction items', () => {
    render(<TransactionList />, { wrapper: createWrapper() });

    const transactionListItems = screen.getAllByTestId('transaction-list-item');
    expect(transactionListItems.length).toBe(2);
  });

  it('passes correct props to TransactionItem components', () => {
    render(<TransactionList />, { wrapper: createWrapper() });

    const paymentMethods = screen.getAllByTestId('payment-method');
    expect(paymentMethods[0].textContent).toBe('link');
    expect(paymentMethods[1].textContent).toBe('cash');

    const amounts = screen.getAllByTestId('amount');
    expect(amounts[0].textContent).toBe('1500');
    expect(amounts[1].textContent).toBe('2000');

    const categories = screen.getAllByTestId('category');
    categories.forEach(category => {
      expect(category.textContent).toBe('Venta');
    });
  });

  it('shows loading state when isLoading is true', () => {
    // Override the mock for this specific test
    mockUseTransactions.mockReturnValue({
      transactions: [],
      isLoading: true,
      error: null,
    });

    render(<TransactionList />, { wrapper: createWrapper() });

    const loadingElement = screen.getByTestId('loading-state');
    expect(loadingElement.textContent).toBe('Loading...');
  });

  it('shows error state when there is an error', () => {
    // Override the mock for this specific test
    mockUseTransactions.mockReturnValue({
      transactions: [],
      isLoading: false,
      error: new Error('Failed to fetch transactions'),
    });

    render(<TransactionList />, { wrapper: createWrapper() });

    const errorElement = screen.getByTestId('error-state');
    expect(errorElement.textContent).toBe(
      'Error: Failed to fetch transactions',
    );
  });

  it('renders the transactions section with proper structure', () => {
    render(<TransactionList />, { wrapper: createWrapper() });

    const section = screen.getByTestId('transactions-section');
    expect(section).toBeDefined();

    const list = screen.getByTestId('transactions-list');
    expect(list).toBeDefined();
    expect(list.tagName.toLowerCase()).toBe('ul');
    expect(list.getAttribute('role')).toBe('list');
  });
});
