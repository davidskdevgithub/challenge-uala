import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransaccionTotalPeriod } from '../transaction-totals-period';
import { Periods } from '../../transactions.types';

// Mock the IconAnalyze component
vi.mock('@/components/icons/icon-analyze', () => ({
  default: () => <div data-testid="icon-analyze">Icon</div>,
}));

// Mock the formatCurrencyToEs function
vi.mock('@/formatters/format-currency', () => ({
  formatCurrencyToEs: (amount: number) => ({
    full: `${amount.toFixed(2)}`,
    entera: `${Math.floor(amount)}`,
    decimal: `${(amount % 1).toFixed(2).substring(2)}`,
  }),
}));

describe('TransaccionTotalPeriod', () => {
  const defaultProps = {
    activePeriod: Periods.WEEKLY,
    onChangeActivePeriod: vi.fn(),
    totalAmount: 35000,
    isLoading: false,
    error: null,
  };

  it('renders with correct heading and amount', () => {
    render(<TransaccionTotalPeriod {...defaultProps} />);

    const heading = screen.getByText('Tus cobros');
    expect(heading).toBeDefined();

    const amount = screen.getByTestId('transaction-amount');
    expect(amount.textContent).toContain('+$35000,00');
  });

  it('renders all period tabs correctly', () => {
    render(<TransaccionTotalPeriod {...defaultProps} />);

    const tabs = screen.getByTestId('period-tabs');
    expect(tabs).toBeDefined();

    Object.values(Periods).forEach(period => {
      const tab = screen.getByTestId(`period-tab-${period}`);
      expect(tab).toBeDefined();
    });
  });

  it('highlights the active period tab', () => {
    render(<TransaccionTotalPeriod {...defaultProps} />);

    const activeTab = screen.getByTestId(
      `period-tab-${defaultProps.activePeriod}`,
    );
    expect(activeTab.getAttribute('aria-selected')).toBe('true');
  });

  it('calls onChangeActivePeriod when a period tab is clicked', () => {
    render(<TransaccionTotalPeriod {...defaultProps} />);

    // Click on a different period tab
    const dayTab = screen.getByTestId(`period-tab-${Periods.DAILY}`);
    fireEvent.click(dayTab);

    expect(defaultProps.onChangeActivePeriod).toHaveBeenCalledWith(
      Periods.DAILY,
    );
  });

  it('shows loading state when isLoading is true', () => {
    render(<TransaccionTotalPeriod {...defaultProps} isLoading={true} />);

    const loadingElement = screen.getByTestId('loading-state');
    expect(loadingElement.textContent).toBe('Cargando...');
  });

  it('shows error state when there is an error', () => {
    render(
      <TransaccionTotalPeriod
        {...defaultProps}
        error={new Error('Failed to fetch data')}
      />,
    );

    const errorElement = screen.getByTestId('error-state');
    expect(errorElement.textContent).toBe('Error: Failed to fetch data');
  });

  it('renders the view analysis link', () => {
    render(<TransaccionTotalPeriod {...defaultProps} />);

    const link = screen.getByTestId('view-analysis-link');
    expect(link).toBeDefined();
    expect(link.textContent).toContain('Ver análisis');
  });

  it('renders the correct panel for the active period', () => {
    render(<TransaccionTotalPeriod {...defaultProps} />);

    const panel = screen.getByTestId(
      `period-panel-${defaultProps.activePeriod}`,
    );
    expect(panel).toBeDefined();
    expect(panel.getAttribute('aria-labelledby')).toBe(
      `tab-${defaultProps.activePeriod}`,
    );
  });
});
