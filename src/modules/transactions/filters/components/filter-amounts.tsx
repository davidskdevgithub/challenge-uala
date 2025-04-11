import { useState } from 'react';

import { FiltersLocal, FilterType, NumberRange } from '../filters.types';

import { FilterSection } from './filter-section';
import { Slider } from '@/components/ui/slider';

interface FilterAmountsProps {
  filter: NonNullable<FiltersLocal[FilterType.AMOUNT]>;
  handleCheckedChange: (type: FilterType, checked: boolean) => void;
  handleAmountRange: (range: NumberRange) => void;
}

export const FilterAmounts: React.FC<FilterAmountsProps> = ({
  filter,
  handleCheckedChange,
  handleAmountRange,
}) => {
  const [sliderValue, setSliderValue] = useState<[number, number]>([
    filter.values.min,
    filter.values.max,
  ]);

  const handleSliderChange = (value: [number, number]) => {
    setSliderValue(value);
    handleAmountRange({
      min: value[0],
      max: value[1],
    });
  };

  return (
    <FilterSection
      icon="dollar-sign"
      title="Monto"
      checked={filter.checked}
      onCheckedChange={checked =>
        handleCheckedChange(FilterType.AMOUNT, checked)
      }
    >
      {filter.checked && (
        <div className="mt-4 space-y-6">
          <div className="text-center text-blue-800 font-medium">
            ${sliderValue[0]} - ${sliderValue[1]}
          </div>

          <div className="relative px-1">
            <Slider
              value={sliderValue}
              min={filter.range.min}
              max={filter.range.max}
              step={1}
              onValueChange={handleSliderChange}
              className="my-6"
            />
          </div>
        </div>
      )}
    </FilterSection>
  );
};
