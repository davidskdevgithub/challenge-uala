import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionItem } from '../transaction-item';
import { PaymentMethodValue } from '../../transactions.types';

// Mock the imported modules
vi.mock('@/components/icons/icon-store', () => ({
  default: () => <div data-testid="icon-store">Icon</div>,
}));

vi.mock('@/formatters/format-currency', () => ({
  formatCurrencyToEs: (amount: number) => `${amount.toFixed(2)}`,
}));

vi.mock('@/formatters/format-date', () => ({
  formatDateToEs: () => '01/01/2025',
}));

vi.mock('../../utils/transactions.labels', () => ({
  labelsPaymentMethod: {
    link: 'Link de pago',
  },
}));

describe('TransactionItem', () => {
  const defaultProps = {
    paymentMethodValue: 'link' as PaymentMethodValue,
    category: 'Venta',
    amount: 1500,
    createdAt: '2025-01-01T12:00:00Z',
  };

  it('renders with correct content', () => {
    render(<TransactionItem {...defaultProps} />);

    const paymentMethod = screen.getByTestId('payment-method');
    expect(paymentMethod.textContent).toBe('Link de pago');

    const category = screen.getByTestId('category');
    expect(category.textContent).toBe('Venta');

    const amount = screen.getByTestId('amount');
    expect(amount.textContent).toBe('+$1500.00');

    const date = screen.getByTestId('date');
    expect(date.textContent).toBe('01/01/2025');

    const icon = screen.getByTestId('icon-store');
    expect(icon).toBeDefined();
  });

  it('displays correct accessibility attributes', () => {
    render(<TransactionItem {...defaultProps} />);

    const amountElement = screen.getByLabelText('Amount: 1500.00 pesos');
    expect(amountElement).toBeDefined();

    const dateElement = screen.getByLabelText('Date: 01/01/2025');
    expect(dateElement).toBeDefined();
  });
});
