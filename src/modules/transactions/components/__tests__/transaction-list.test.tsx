import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionList } from '../transaction-list';
import { TransactionItemProps } from '../transaction-item';
import { mockTransactions } from '../../transactions.mocks';

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

describe('TransactionList', () => {
  it('renders the transaction list with correct heading', () => {
    render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        error={null}
      />,
    );

    const heading = screen.getByTestId('transactions-heading');
    expect(heading.textContent).toBe('Historial de Transacciones');
  });

  it('renders the correct number of transaction items', () => {
    render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        error={null}
      />,
    );

    const transactionListItems = screen.getAllByTestId('transaction-list-item');
    expect(transactionListItems.length).toBe(3);
  });

  it('passes correct props to TransactionItem components', () => {
    render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        error={null}
      />,
    );

    const paymentMethods = screen.getAllByTestId('payment-method');
    expect(paymentMethods[0].textContent).toBe('link');
    expect(paymentMethods[1].textContent).toBe('mpos');

    const amounts = screen.getAllByTestId('amount');
    expect(amounts[0].textContent).toBe('1393.71');
    expect(amounts[1].textContent).toBe('1393.13');

    const categories = screen.getAllByTestId('category');
    categories.forEach(category => {
      expect(category.textContent).toBe('Venta');
    });
  });

  it('shows loading state when isLoading is true', () => {
    render(<TransactionList transactions={[]} isLoading={true} error={null} />);

    const loadingElement = screen.getByTestId('loading-state');
    expect(loadingElement.textContent).toBe('Loading...');
  });

  it('shows error state when there is an error', () => {
    render(
      <TransactionList
        transactions={[]}
        isLoading={false}
        error={new Error('Failed to fetch transactions')}
      />,
    );

    const errorElement = screen.getByTestId('error-state');
    expect(errorElement.textContent).toBe(
      'Error: Failed to fetch transactions',
    );
  });

  it('renders the transactions section with proper structure', () => {
    render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        error={null}
      />,
    );

    const section = screen.getByTestId('transactions-section');
    expect(section).toBeDefined();

    const list = screen.getByTestId('transactions-list');
    expect(list).toBeDefined();
    expect(list.tagName.toLowerCase()).toBe('ul');
    expect(list.getAttribute('role')).toBe('list');
  });
});
