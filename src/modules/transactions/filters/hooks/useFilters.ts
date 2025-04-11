import { useState, useMemo, useCallback } from 'react';

import { FilterType, FiltersLocal, FiltersStore } from '../filters.types';
import { useFiltersStore } from '../store/filters-store';

import { CardValue } from '../../transactions.types';

export const useFilters = () => {
  const storeFilters = useFiltersStore(state => state.toApply);

  // Local state to use in the UI
  const [localFilters, setLocalFilters] = useState<FiltersLocal>(() => {
    const initialState: FiltersLocal = {};

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

    return initialState;
  });

  // Intermadiate state to format the local to the store
  const currentFilters = useMemo(() => {
    const filtersFormatted: FiltersStore = {};

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

  const handleCardSelect = useCallback(
    (value: CardValue | 'todas') => {
      setLocalFilters(prev => {
        const cardState = prev[FilterType.CARD];
        if (!cardState) return prev;

        const newOptions = cardState.options.map(option => {
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
          [FilterType.CARD]: {
            ...cardState,
            options: newOptions,
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

  return {
    storeFilters,
    localFilters,
    currentFilters,

    handleCheckedChange,
    handleCardSelect,

    applyFilters,
  };
};
