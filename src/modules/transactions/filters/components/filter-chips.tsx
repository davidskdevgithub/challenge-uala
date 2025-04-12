import {
  FiltersLocal,
  FilterType,
  FilterChipOption,
  FilterOptValues,
} from '../filters.types';

import { FilterSection } from './filter-section';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterChipProps {
  filter: NonNullable<FiltersLocal[FilterType]>;
  filterType: FilterType;
  icon: 'calendar' | 'credit-card' | 'receipt' | 'dollar-sign' | 'file-text'; //TODO: replace with icons from Figma
  title: string;
  handleCheckedChange: (type: FilterType, checked: boolean) => void;
  handleChipSelect: (value: FilterOptValues) => void;
}

export const FilterChips: React.FC<FilterChipProps> = ({
  filter,
  filterType,
  icon,
  title,
  handleCheckedChange,
  handleChipSelect,
}) => {
  // Type guard to check if filter has options property
  const hasOptions = (
    filter: NonNullable<FiltersLocal[FilterType]>,
  ): filter is {
    checked: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: FilterChipOption<any>[];
  } => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return 'options' in filter && Array.isArray((filter as any).options);
  };

  if (!hasOptions(filter)) {
    return null;
  }
  return (
    <FilterSection
      icon={icon}
      title={title}
      checked={filter.checked}
      onCheckedChange={checked => handleCheckedChange(filterType, checked)}
      data-testid="card-filter-section"
    >
      {filter.checked && (
        <div
          className="flex flex-wrap gap-2 mb-4"
          data-testid="card-options-container"
        >
          {filter.options.map(({ value, label, isSelected }) => {
            return (
              <Badge
                key={value}
                variant={isSelected ? 'default' : 'outline'}
                className={`
                      rounded-full px-4 py-1.5 cursor-pointer
                      ${
                        isSelected
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300'
                          : 'bg-white border hover:bg-gray-100'
                      }
                    `}
                role="button"
                aria-pressed={isSelected}
                tabIndex={0}
                onClick={() => {
                  handleChipSelect(value);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleChipSelect(value);
                  }
                }}
                data-testid={`card-option-${value}`}
              >
                {label}
                {isSelected && (
                  <X className="h-3 w-3 ml-1 inline" aria-hidden="true" />
                )}
              </Badge>
            );
          })}
        </div>
      )}
    </FilterSection>
  );
};
