import { FiltersLocal, FilterType } from '../filters.types';
import { DateRange } from 'react-day-picker';

import { FilterSection } from './filter-section';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

interface FilterDateProps {
  filter: NonNullable<FiltersLocal[FilterType.DATE]>;
  handleCheckedChange: (type: FilterType, checked: boolean) => void;
  handleDateSelect: (dateRange: DateRange) => void;
}

export const FilterDate: React.FC<FilterDateProps> = ({
  filter,
  handleCheckedChange,
  handleDateSelect,
}) => {
  return (
    <FilterSection
      icon="calendar"
      title="Fecha"
      checked={filter.checked}
      onCheckedChange={checked => handleCheckedChange(FilterType.DATE, checked)}
      data-testid="date-filter-section"
    >
      {filter.checked && (
        <div className="flex flex-col items-end max-w-3xs mx-auto mb-4 pb-4 border rounded-md bg-white">
          <Calendar
            mode="range"
            selected={filter.dateRange}
            onSelect={range =>
              handleDateSelect({ from: range?.from, to: range?.to })
            }
            className="w-full"
            components={{
              IconLeft: () => <ChevronLeft className="h-4 w-4" />,
              IconRight: () => <ChevronRight className="h-4 w-4" />,
            }}
            disabled={{
              before: new Date(CURRENT_YEAR, 0, 1),
              after: new Date(CURRENT_YEAR, 11, 31),
            }}
          />
          <Button
            variant="outline"
            onClick={() => handleDateSelect({ from: undefined, to: undefined })}
            className="text-primary-blue border-primary-blue hover:bg-primary-blue-light hover:text-primary-blue rounded-3xl mr-4"
          >
            Borrar
          </Button>
        </div>
      )}
    </FilterSection>
  );
};
