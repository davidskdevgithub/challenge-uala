import { create } from 'zustand';

import { FiltersStore, FilterType } from '../filters.types';

export interface FiltersState {
  toApply: FiltersStore;
  setFilterValues: <K extends keyof FiltersStore>(
    type: K,
    values: NonNullable<FiltersStore[K]>,
  ) => void;
  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()(set => ({
  toApply: {
    [FilterType.DATE]: [],
    [FilterType.CARD]: [],
    [FilterType.AMOUNT]: [],
    [FilterType.INSTALLMENTS]: [],
    [FilterType.PAYMENT_METHOD]: [],
  },

  setFilterValues: (type, values) => {
    set(state => ({
      toApply: {
        ...state.toApply,
        [type]: values,
      },
    }));
  },

  clearFilters: () => {
    set(state => {
      const clearedFilters = Object.keys(state.toApply).reduce((acc, key) => {
        acc[key as keyof FiltersStore] = [];
        return acc;
      }, {} as FiltersStore);

      return { toApply: clearedFilters };
    });
  },
}));
