import { CardValue } from '../transactions.types';
import { DateRange } from 'react-day-picker';

export enum FilterType {
  DATE = 'date',
  CARD = 'card',
  AMOUNT = 'amount',
  // INSTALLMENTS = 'installments',
  // PAYMENT_METHOD = 'paymentMethod',
}

export interface NumberRange {
  min: number;
  max: number;
}

export type FilterValues = DateRange | CardValue | NumberRange;

export interface FiltersStore {
  [FilterType.DATE]?: FilterValues[];
  [FilterType.CARD]?: FilterValues[];
  [FilterType.AMOUNT]?: FilterValues[];
}

export interface FilterChipOption<T> {
  label: string;
  value: T;
  isSelected: boolean;
}

interface BaseFiltersLocal {
  [FilterType.DATE]?: {
    checked: boolean;
    dateRange: DateRange;
  };
  [FilterType.CARD]?: {
    checked: boolean;
    options: FilterChipOption<CardValue | 'todas'>[];
  };
  [FilterType.AMOUNT]?: {
    checked: boolean;
    range: NumberRange;
    values: NumberRange;
  };
}

// Use a mapped type to ensure that FiltersLocal has the same keys as FiltersStore
export type FiltersLocal = {
  [K in keyof FiltersStore]?: K extends keyof BaseFiltersLocal
    ? BaseFiltersLocal[K]
    : never;
};
