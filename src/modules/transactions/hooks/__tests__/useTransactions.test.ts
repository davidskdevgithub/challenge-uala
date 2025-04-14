import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Periods } from '../../transactions.types';
import { useTransactions } from '../useTransactions';
import * as useQueryTransactionsModule from '../useQueryTransactions';
import * as transactionsStoreModule from '../../store/transactions-store';
import * as filtersStoreModule from '../../filters/store/filters-store';
import { FilterType } from '../../filters/filters.types';
import { CardValue, PaymentMethodValue } from '../../transactions.types';

// Create mock transactions with deliberately different dates
const createMockTransactions = () => {
  // Create dates for today, yesterday, and last month
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastMonth = new Date(today);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  
  return [
    {
      id: '1',
      amount: 100,
      createdAt: today.toISOString(), // Today's transaction - for DAILY
      paymentMethod: PaymentMethodValue.LINK,
      card: CardValue.VISA,
      installments: 1,
      updatedAt: today.toISOString()
    },
    {
      id: '2',
      amount: 200,
      createdAt: yesterday.toISOString(), // Recent transaction - for WEEKLY
      paymentMethod: PaymentMethodValue.MPOS,
      card: CardValue.MASTERCARD,
      installments: 3,
      updatedAt: yesterday.toISOString()
    },
    {
      id: '3',
      amount: 500,
      createdAt: lastMonth.toISOString(), // Old transaction - for MONTHLY
      paymentMethod: PaymentMethodValue.QR,
      card: CardValue.AMEX,
      installments: 6,
      updatedAt: lastMonth.toISOString()
    }
  ];
};

describe('useTransactions', () => {
let mockTransactions: ReturnType<typeof createMockTransactions>;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();

    mockTransactions = createMockTransactions();

    // Set up our mocks with default implementations
    vi.spyOn(
      useQueryTransactionsModule,
      'useQueryTransactions',
    ).mockReturnValue({
      data: {
        transactions: mockTransactions,
        metadata: { paymentMethods: [], cards: [] },
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    vi.spyOn(
      transactionsStoreModule,
      'useTransactionsStore',
    ).mockImplementation(selector => {
      const state = {
        transactions: mockTransactions,
        paymentMethods: [],
        cards: [],
        isInitialized: true,
        setAllData: vi.fn(),
        getAllTransactions: () => mockTransactions,
        getPaymentMethods: () => [],
        getCards: () => [],
      };
      return selector(state);
    });

    vi.spyOn(filtersStoreModule, 'useFiltersStore').mockImplementation(
      selector => {
        const state = {
          toApply: {
            [FilterType.DATE]: [],
            [FilterType.CARD]: [],
            [FilterType.AMOUNT]: [],
            [FilterType.INSTALLMENTS]: [],
            [FilterType.PAYMENT_METHOD]: [],
          },
        };
        return selector({
          ...state,
          setFilterValues: vi.fn(),
          clearFilters: vi.fn(),
        });
      },
    );
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useTransactions());

    // Check initial values
    expect(result.current.transactions).toEqual(mockTransactions);
    expect(result.current.transactionsFiltered).toEqual(mockTransactions);
    expect(result.current.activePeriod).toBe(Periods.WEEKLY);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('allows changing the active period', () => {
    const { result } = renderHook(() => useTransactions());

    // Initial period should be WEEKLY
    expect(result.current.activePeriod).toBe(Periods.WEEKLY);

    // Change to daily
    act(() => {
      result.current.setActivePeriod(Periods.DAILY);
    });

    // Period should now be DAILY
    expect(result.current.activePeriod).toBe(Periods.DAILY);

    // Change to monthly
    act(() => {
      result.current.setActivePeriod(Periods.MONTHLY);
    });

    // Period should now be MONTHLY
    expect(result.current.activePeriod).toBe(Periods.MONTHLY);
  });

  it('updates totalAmount when changing period', () => {
    const { result } = renderHook(() => useTransactions());
    
    // Store the initial total amount (WEEKLY)
    const initialAmount = result.current.totalAmount;
    
    // Change to DAILY
    act(() => {
      result.current.setActivePeriod(Periods.DAILY);
    });
    
    // Store DAILY amount
    const dailyAmount = result.current.totalAmount;
    
    // Change to MONTHLY
    act(() => {
      result.current.setActivePeriod(Periods.MONTHLY);
    });
    
    // Store MONTHLY amount
    const monthlyAmount = result.current.totalAmount;
    
    // Verify that totalAmount changes when period changes
    // We expect DAILY to only include transactions from today
    // We expect MONTHLY to include all transactions
    
    // Different periods should produce different totals
    expect(dailyAmount).not.toBe(initialAmount);
    expect(monthlyAmount).not.toBe(dailyAmount);
    
    // Log the values to help with debugging
    console.log({
      weekly: initialAmount,
      daily: dailyAmount, 
      monthly: monthlyAmount
    });
  });

  it('filters transactions based on applied filters', () => {
    // Mock filter store to return some active filters
    const filteredMockTransaction = [mockTransactions[0]]; // Just the first transaction

    // Create a mock implementation of filterMethods that returns our filtered result
    vi.mock('../filters/utils/filters.method', () => ({
      filterMethods: {
        [FilterType.CARD]: vi.fn().mockReturnValue(filteredMockTransaction),
      },
    }));

    // Update the filter store mock to have active card filters
    vi.spyOn(filtersStoreModule, 'useFiltersStore').mockImplementation(
      selector => {
        const state = {
          toApply: {
            [FilterType.CARD]: [CardValue.VISA], // We're filtering for VISA cards
            [FilterType.DATE]: [],
            [FilterType.AMOUNT]: [],
            [FilterType.INSTALLMENTS]: [],
            [FilterType.PAYMENT_METHOD]: [],
          },
        };
        return selector({
          ...state,
          setFilterValues: vi.fn(),
          clearFilters: vi.fn(),
        });
      },
    );

    const { result } = renderHook(() => useTransactions());

    // Verify transactions have been filtered
    expect(result.current.transactionsFiltered).toEqual(
      filteredMockTransaction,
    );
    expect(result.current.transactionsFiltered.length).toBe(1);
  });

  it('handles loading state correctly', () => {
    // Mock useQueryTransactions to return loading state
    vi.spyOn(
      useQueryTransactionsModule,
      'useQueryTransactions',
    ).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    // Mock store to indicate it's not initialized
    vi.spyOn(
      transactionsStoreModule,
      'useTransactionsStore',
    ).mockImplementation(selector => {
      const state = {
        transactions: [],
        paymentMethods: [],
        cards: [],
        isInitialized: false, // Not initialized
        setAllData: vi.fn(),
        getAllTransactions: () => [],
        getPaymentMethods: () => [],
        getCards: () => [],
      };
      return selector(state);
    });

    const { result } = renderHook(() => useTransactions());

    // Should indicate loading
    expect(result.current.isLoading).toBe(true);
    // Should have empty transactions while loading
    expect(result.current.transactions).toEqual([]);
  });
});
