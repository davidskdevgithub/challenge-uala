import { useState, useMemo, useCallback } from 'react';

import {
  FilterType,
  FiltersLocal,
  FiltersStore,
  FilterOptValues,
  InstallmentValue,
} from '../filters.types';
import { useFiltersStore } from '../store/filters-store';

import { CardValue, PaymentMethodValue } from '../../transactions.types';
import { DateRange } from 'react-day-picker';

const MAX_AMOUNT = 2000;

const createInitialFiltersState = (): FiltersLocal => {
  const initialState: FiltersLocal = {};

  initialState[FilterType.DATE] = {
    checked: false,
    dateRange: {
      from: undefined,
      to: undefined,
    },
  };

  initialState[FilterType.CARD] = {
    checked: false,
    options: [
      {
        value: 'todas',
        label: 'Todas',
        isSelected: false,
      },
      // TODO: replace hardcode values with the real data
      {
        value: CardValue.VISA,
        label: 'Visa',
        isSelected: false,
      },
      {
        value: CardValue.MASTERCARD,
        label: 'Mastercard',
        isSelected: false,
      },
      {
        value: CardValue.AMEX,
        label: 'American Express',
        isSelected: false,
      },
    ],
  };

  initialState[FilterType.AMOUNT] = {
    checked: false,
    range: {
      min: 0,
      max: MAX_AMOUNT,
    },
    values: {
      min: 0,
      max: MAX_AMOUNT,
    },
  };

  initialState[FilterType.INSTALLMENTS] = {
    checked: false,
    options: [
      {
        value: 'todas',
        label: 'Todas',
        isSelected: false,
      },
      // TODO: replace hardcode values with the real data
      {
        value: 1,
        label: '1',
        isSelected: false,
      },
      {
        value: 2,
        label: '2',
        isSelected: false,
      },
      {
        value: 3,
        label: '3',
        isSelected: false,
      },
      {
        value: 6,
        label: '6',
        isSelected: false,
      },
      {
        value: 12,
        label: '12',
        isSelected: false,
      },
    ],
  };

  initialState[FilterType.PAYMENT_METHOD] = {
    checked: false,
    options: [
      {
        value: PaymentMethodValue.LINK,
        label: 'Link de pago',
        isSelected: false,
      },
      {
        value: PaymentMethodValue.QR,
        label: 'Codigo QR',
        isSelected: false,
      },
      {
        value: PaymentMethodValue.MPOS,
        label: 'MPOS',
        isSelected: false,
      },
      {
        value: PaymentMethodValue.POSPRO,
        label: 'POS Pro',
        isSelected: false,
      },
    ],
  };

  return initialState;
};

export const useFilters = () => {
  const storeFilters = useFiltersStore(state => state.toApply);

  // Local state to use in the UI
  const [localFilters, setLocalFilters] = useState<FiltersLocal>(() =>
    createInitialFiltersState(),
  );

  // Intermadiate state to format the local to the store
  const currentFilters = useMemo(() => {
    const filtersFormatted: FiltersStore = {};

    const dateState = localFilters[FilterType.DATE];
    if (dateState) {
      const dateRange = dateState.dateRange;

      filtersFormatted[FilterType.DATE] =
        dateState.checked && dateRange.from ? [dateRange] : [];
    }

    const cardState = localFilters[FilterType.CARD];
    if (cardState) {
      const isAllSelected = cardState.options.find(
        opt => opt.value === 'todas',
      )?.isSelected;

      const selectedOptions = isAllSelected
        ? cardState.options.filter(opt => opt.value !== 'todas')
        : cardState.options.filter(option => option.isSelected);

      const cardValues: CardValue[] = cardState.checked
        ? selectedOptions.map(option => option.value as CardValue)
        : [];

      filtersFormatted[FilterType.CARD] =
        cardValues.length > 0 ? cardValues : [];
    }

    const amountState = localFilters[FilterType.AMOUNT];
    if (amountState) {
      const { min, max } = amountState.values;

      filtersFormatted[FilterType.AMOUNT] =
        amountState.checked && min <= max ? [{ min, max }] : [];
    }

    const installmentState = localFilters[FilterType.INSTALLMENTS];
    if (installmentState) {
      const isAllSelected = installmentState.options.find(
        opt => opt.value === 'todas',
      )?.isSelected;

      const selectedOptions = isAllSelected
        ? installmentState.options.filter(opt => opt.value !== 'todas')
        : installmentState.options.filter(option => option.isSelected);

      const installmentValues: InstallmentValue[] = installmentState.checked
        ? selectedOptions.map(option => option.value as InstallmentValue)
        : [];

      filtersFormatted[FilterType.INSTALLMENTS] =
        installmentValues.length > 0 ? installmentValues : [];
    }

    const paymentMethodState = localFilters[FilterType.PAYMENT_METHOD];
    if (paymentMethodState) {
      const paymentMethodValues: PaymentMethodValue[] =
        paymentMethodState.checked
          ? paymentMethodState.options
              .filter(option => option.isSelected)
              .map(option => option.value as PaymentMethodValue)
          : [];

      filtersFormatted[FilterType.PAYMENT_METHOD] =
        paymentMethodValues.length > 0 ? paymentMethodValues : [];
    }

    return filtersFormatted;
  }, [localFilters]);

  const handleCheckedChange = useCallback(
    (type: FilterType, checked: boolean) => {
      setLocalFilters(prev => {
        const filterState = prev[type];
        if (!filterState) return prev;

        return {
          ...prev,
          [type]: {
            ...filterState,
            checked,
          },
        };
      });
    },
    [setLocalFilters],
  );

  const handleDateSelect = useCallback(
    (dateRange: DateRange) => {
      setLocalFilters(prev => {
        const dateState = prev[FilterType.DATE];
        if (!dateState) return prev;

        // If there's a "to" date, set it to the end of the day (23:59:59.999)
        const adjustedRange = { ...dateRange };
        if (adjustedRange.to) {
          const endOfDay = new Date(adjustedRange.to);
          endOfDay.setHours(23, 59, 59, 999);
          adjustedRange.to = endOfDay;
        }

        return {
          ...prev,
          [FilterType.DATE]: {
            ...dateState,
            dateRange: adjustedRange,
          },
        };
      });
    },
    [setLocalFilters],
  );

  const handleChipSelect = useCallback(
    (filterType: FilterType, value: FilterOptValues) => {
      setLocalFilters(prev => {
        const filterState = prev[filterType];
        if (!filterState || !('options' in filterState)) return prev;

        const newOptions = filterState.options.map(option => {
          if (value === 'todas') {
            return {
              ...option,
              isSelected: option.value === 'todas' ? !option.isSelected : false,
            };
          }

          if (option.value === 'todas') {
            return {
              ...option,
              isSelected: false,
            };
          }
          if (option.value === value) {
            return {
              ...option,
              isSelected: !option.isSelected,
            };
          }
          return option;
        });

        return {
          ...prev,
          [filterType]: {
            ...filterState,
            options: newOptions,
          },
        };
      });
    },
    [setLocalFilters],
  );

  const handleAmountChange = useCallback(
    (values: { min: number; max: number }) => {
      setLocalFilters(prev => {
        const amountState = prev[FilterType.AMOUNT];
        if (!amountState) return prev;

        return {
          ...prev,
          [FilterType.AMOUNT]: {
            ...amountState,
            values,
          },
        };
      });
    },
    [setLocalFilters],
  );

  const setFilterValues = useFiltersStore(state => state.setFilterValues);
  const applyFilters = useCallback(() => {
    for (const filterType of Object.keys(currentFilters) as FilterType[]) {
      const filterValue = currentFilters[filterType];
      if (filterValue) {
        setFilterValues(filterType, filterValue);
      }
    }
  }, [currentFilters, setFilterValues]);

  const isApplyEnabled = useMemo(() => {
    for (const values of Object.values(localFilters)) {
      if (values?.checked) {
        return true;
      }
    }
    return false;
  }, [localFilters]);

  const clearFiltersStore = useFiltersStore(state => state.clearFilters);
  const clearFilters = useCallback(() => {
    // Reset all local filters to initial state
    setLocalFilters(createInitialFiltersState());

    // Clear filters in the store
    clearFiltersStore();
  }, [clearFiltersStore, setLocalFilters]);

  return {
    storeFilters,
    localFilters,
    currentFilters,

    handleCheckedChange,
    handleDateSelect,
    handleChipSelect,
    handleAmountChange,

    applyFilters,
    isApplyEnabled,
    clearFilters,
  };
};
