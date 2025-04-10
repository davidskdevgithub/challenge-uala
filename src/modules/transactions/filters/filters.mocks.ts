import { FilterChipOption } from './filters.types';
import { CardValue } from '../transactions.types';

export const mockFilterCardOptions: FilterChipOption<CardValue | 'todas'>[] = [
  {
    label: 'Todas',
    value: 'todas',
    isSelected: false,
  },
  {
    label: 'Visa',
    value: CardValue.VISA,
    isSelected: false,
  },
  {
    label: 'Mastercard',
    value: CardValue.MASTERCARD,
    isSelected: false,
  },
  {
    label: 'Amex',
    value: CardValue.AMEX,
    isSelected: false,
  },
];
