import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilters } from '../useFilters';
import { FilterType } from '../../filters.types';
import {
  CardValue,
  PaymentMethodValue,
} from '@/modules/transactions/transactions.types';
import * as filtersStoreModule from '../../store/filters-store';

// Mock the filters store
vi.mock('../store/filters-store', () => {
  return {
    useFiltersStore: vi.fn().mockImplementation(selector => {
      const state = {
        toApply: {
          [FilterType.DATE]: [],
          [FilterType.CARD]: [],
          [FilterType.AMOUNT]: [],
          [FilterType.INSTALLMENTS]: [],
          [FilterType.PAYMENT_METHOD]: [],
        },
        setFilterValues: vi.fn(),
        clearFilters: vi.fn(),
      };

      return selector(state);
    }),
  };
});

describe('useFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default filter values', () => {
    const { result } = renderHook(() => useFilters());

    // Check that all filters exist and are initialized properly
    expect(result.current.localFilters[FilterType.DATE]).toBeDefined();
    expect(result.current.localFilters[FilterType.DATE]?.checked).toBe(false);

    expect(result.current.localFilters[FilterType.CARD]).toBeDefined();
    expect(result.current.localFilters[FilterType.CARD]?.checked).toBe(false);

    expect(result.current.localFilters[FilterType.AMOUNT]).toBeDefined();
    expect(result.current.localFilters[FilterType.AMOUNT]?.checked).toBe(false);

    expect(result.current.localFilters[FilterType.INSTALLMENTS]).toBeDefined();
    expect(result.current.localFilters[FilterType.INSTALLMENTS]?.checked).toBe(
      false,
    );

    expect(
      result.current.localFilters[FilterType.PAYMENT_METHOD],
    ).toBeDefined();
    expect(
      result.current.localFilters[FilterType.PAYMENT_METHOD]?.checked,
    ).toBe(false);

    // Verify that no filters are enabled
    expect(result.current.isApplyEnabled).toBe(false);
  });

  it('toggles filter checked state correctly', () => {
    const { result } = renderHook(() => useFilters());

    // Initially all filters should be unchecked
    expect(result.current.localFilters[FilterType.CARD]?.checked).toBe(false);

    // Toggle the card filter on
    act(() => {
      result.current.handleCheckedChange(FilterType.CARD, true);
    });

    // Verify card filter is now checked
    expect(result.current.localFilters[FilterType.CARD]?.checked).toBe(true);

    // Verify that isApplyEnabled is now true
    expect(result.current.isApplyEnabled).toBe(true);

    // Verify other filters remained unchanged
    expect(result.current.localFilters[FilterType.DATE]?.checked).toBe(false);
  });

  it('selects and deselects chip options correctly', () => {
    const { result } = renderHook(() => useFilters());

    // First enable the card filter
    act(() => {
      result.current.handleCheckedChange(FilterType.CARD, true);
    });

    // Now select the 'todas' option that we know exists
    act(() => {
      result.current.handleChipSelect(FilterType.CARD, 'todas');
    });

    // Check if the 'todas' option is now selected
    const updatedOptions =
      result.current.localFilters[FilterType.CARD]?.options;
    const todasOption = updatedOptions?.find(opt => opt.value === 'todas');

    expect(todasOption?.isSelected).toBe(true);

    // Now deselect it
    act(() => {
      result.current.handleChipSelect(FilterType.CARD, 'todas');
    });

    // Check if it's deselected
    const finalOptions = result.current.localFilters[FilterType.CARD]?.options;
    const finalTodasOption = finalOptions?.find(opt => opt.value === 'todas');

    expect(finalTodasOption?.isSelected).toBe(false);
  });

  it('applies filters correctly to the store', () => {
    // Create a mock for setFilterValues
    const setFilterValuesMock = vi.fn();

    // Create a spy on the actual imported module
    const useFiltersStoreSpy = vi.spyOn(filtersStoreModule, 'useFiltersStore');

    // Update the implementation for this test
    useFiltersStoreSpy.mockImplementation(selector => {
      const state = {
        toApply: {
          [FilterType.DATE]: [],
          [FilterType.CARD]: [],
          [FilterType.AMOUNT]: [],
          [FilterType.INSTALLMENTS]: [],
          [FilterType.PAYMENT_METHOD]: [],
        },
        setFilterValues: setFilterValuesMock,
        clearFilters: vi.fn(),
      };

      return selector(state);
    });

    const { result } = renderHook(() => useFilters());

    // Set up a filter scenario
    act(() => {
      // Enable card filter
      result.current.handleCheckedChange(FilterType.CARD, true);

      // Select the 'todas' option that we know exists
      result.current.handleChipSelect(FilterType.CARD, 'todas');
    });

    // Apply the filters
    act(() => {
      result.current.applyFilters();
    });

    // Verify setFilterValues was called
    expect(setFilterValuesMock).toHaveBeenCalled();
  });

  it('clears all filters correctly', () => {
    const { result } = renderHook(() => useFilters());

    // Set up some filters
    act(() => {
      result.current.handleCheckedChange(FilterType.CARD, true);
      result.current.handleChipSelect(FilterType.CARD, CardValue.VISA);

      result.current.handleCheckedChange(FilterType.PAYMENT_METHOD, true);
      result.current.handleChipSelect(
        FilterType.PAYMENT_METHOD,
        PaymentMethodValue.LINK,
      );
    });

    // Verify filters are applied
    expect(result.current.isApplyEnabled).toBe(true);

    // Clear all filters
    act(() => {
      result.current.clearFilters();
    });

    // Verify all filters are reset
    expect(result.current.localFilters[FilterType.CARD]?.checked).toBe(false);
    expect(
      result.current.localFilters[FilterType.PAYMENT_METHOD]?.checked,
    ).toBe(false);

    // Verify no filters are selected
    const cardOptions = result.current.localFilters[FilterType.CARD]?.options;
    expect(cardOptions?.some(option => option.isSelected)).toBe(false);

    // Verify apply is disabled
    expect(result.current.isApplyEnabled).toBe(false);
  });
});
