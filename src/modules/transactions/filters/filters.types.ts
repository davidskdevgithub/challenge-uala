import { CardValue } from '../transactions.types';

export enum FilterType {
  CARD = 'card',
  // DATE = 'date',
  // AMOUNT = 'amount',
  // INSTALLMENTS = 'installments',
  // PAYMENT_METHOD = 'paymentMethod',
}

export interface FiltersStore {
  [FilterType.CARD]?: CardValue[];
}

export interface FilterChipOption<T> {
  label: string;
  value: T;
  isSelected: boolean;
}

interface BaseFiltersLocal {
  [FilterType.CARD]?: {
    checked: boolean;
    options: FilterChipOption<CardValue | 'todas'>[];
  };
}

// Use a mapped type to ensure that FiltersLocal has the same keys as FiltersStore
export type FiltersLocal = {
  [K in keyof FiltersStore]?: K extends keyof BaseFiltersLocal
    ? BaseFiltersLocal[K]
    : never;
};
