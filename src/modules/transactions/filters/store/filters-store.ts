import { create } from 'zustand';

import { FiltersStore, FilterType } from '../filters.types';

export interface FiltersState {
  toApply: FiltersStore;
  setFilterValues: <K extends keyof FiltersStore>(
    type: K,
    values: NonNullable<FiltersStore[K]>,
  ) => void;
}

export const useFiltersStore = create<FiltersState>()(set => ({
  toApply: {
    [FilterType.CARD]: [],
  },

  setFilterValues: (type, values) => {
    set(state => ({
      toApply: {
        ...state.toApply,
        [type]: values,
      },
    }));
  },
}));
