import { CardValue, PaymentMethodValue } from '../transactions.types';
import { DateRange } from 'react-day-picker';

export enum FilterType {
  DATE = 'date',
  CARD = 'card',
  AMOUNT = 'amount',
  INSTALLMENTS = 'installments',
  PAYMENT_METHOD = 'paymentMethod',
}

export interface NumberRange {
  min: number;
  max: number;
}

export type InstallmentValue = 1 | 2 | 3 | 6 | 12;

export type FilterValues =
  | DateRange
  | CardValue
  | NumberRange
  | InstallmentValue
  | PaymentMethodValue;

export type FilterOptValues =
  | 'todas'
  | CardValue
  | InstallmentValue
  | PaymentMethodValue;

export interface FiltersStore {
  [FilterType.DATE]?: FilterValues[];
  [FilterType.CARD]?: FilterValues[];
  [FilterType.AMOUNT]?: FilterValues[];
  [FilterType.INSTALLMENTS]?: FilterValues[];
  [FilterType.PAYMENT_METHOD]?: FilterValues[];
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
  [FilterType.INSTALLMENTS]?: {
    checked: boolean;
    options: FilterChipOption<InstallmentValue | 'todas'>[];
  };
  [FilterType.PAYMENT_METHOD]?: {
    checked: boolean;
    options: FilterChipOption<PaymentMethodValue>[];
  };
}

// Use a mapped type to ensure that FiltersLocal has the same keys as FiltersStore
export type FiltersLocal = {
  [K in keyof FiltersStore]?: K extends keyof BaseFiltersLocal
    ? BaseFiltersLocal[K]
    : never;
};
