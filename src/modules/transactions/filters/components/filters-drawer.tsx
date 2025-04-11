import { useState } from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import IconFilter from '@/components/icons/icon-filter';
import { ChevronLeft, X } from 'lucide-react';

import { useFilters } from '../hooks/useFilters';
import { FilterSection } from './filter-section';
import { FilterType } from '../filters.types';
import { FilterAmounts } from './filter-amounts';
import { FilterDate } from './filter-date';

export const FiltersDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    storeFilters,
    localFilters,
    currentFilters,
    handleCheckedChange,
    handleDateSelect,
    handleCardSelect,
    handleAmountChange,
    applyFilters,
  } = useFilters();
  // debug purpose only, remove later
  console.log({ storeFilters, localFilters, currentFilters });

  const handleApplyFilters = () => {
    applyFilters();
    setIsOpen(false);
  };

  return (
    <Drawer
      direction="right"
      handleOnly
      open={isOpen}
      onOpenChange={setIsOpen}
      data-testid="filters-drawer"
    >
      <DrawerTrigger asChild>
        <button
          aria-label="Open filters"
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
          data-testid="filter-button"
        >
          <IconFilter className="w-auto h-auto" aria-hidden="true" />
        </button>
      </DrawerTrigger>
      <DrawerContent
        aria-labelledby="filters-title"
        data-testid="drawer-content"
      >
        <div
          className="mx-auto w-full max-w-md h-full flex flex-col"
          data-testid="drawer-container"
        >
          <DrawerHeader className="px-4 py-12">
            <div className="flex items-center gap-4">
              <DrawerClose asChild>
                <button
                  aria-label="Close filters"
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
                  data-testid="close-button"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
              </DrawerClose>
              <DrawerTitle
                id="filters-title"
                className="text-base font-semibold text-neutral-dark"
                data-testid="drawer-title"
              >
                Filtros
              </DrawerTitle>
            </div>
          </DrawerHeader>

          <div
            className="p-4 pb-0 overflow-y-auto"
            data-testid="filters-content"
          >
            <div className="h-12 flex justify-between items-center mb-2">
              <h2
                className="font-semibold text-neutral-dark text-base"
                data-testid="filters-heading"
              >
                Todos los filtros
              </h2>
              <Button
                variant="link"
                className="font-light text-primary-blue text-base"
                aria-label="Clear all filters"
                data-testid="clear-filters-button"
              >
                Limpiar
              </Button>
            </div>

            <div
              className="flex flex-col items-stretch"
              role="group"
              aria-label="Filter options"
              data-testid="filter-options-group"
            >
              {localFilters[FilterType.DATE] && (
                <FilterDate
                  filter={localFilters[FilterType.DATE]}
                  handleCheckedChange={handleCheckedChange}
                  handleDateSelect={handleDateSelect}
                />
              )}

              {localFilters[FilterType.CARD] && (
                <FilterSection
                  icon="credit-card"
                  title="Tarjeta"
                  checked={localFilters[FilterType.CARD].checked}
                  onCheckedChange={checked =>
                    handleCheckedChange(FilterType.CARD, checked)
                  }
                  data-testid="card-filter-section"
                >
                  {localFilters[FilterType.CARD].checked && (
                    <div
                      className="flex flex-wrap gap-2 mb-4"
                      data-testid="card-options-container"
                    >
                      {localFilters[FilterType.CARD].options.map(
                        ({ value, label, isSelected }) => {
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
                                handleCardSelect(value);
                              }}
                              onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleCardSelect(value);
                                }
                              }}
                              data-testid={`card-option-${value}`}
                            >
                              {label}
                              {isSelected && (
                                <X
                                  className="h-3 w-3 ml-1 inline"
                                  aria-hidden="true"
                                />
                              )}
                            </Badge>
                          );
                        },
                      )}
                    </div>
                  )}
                </FilterSection>
              )}

              {localFilters[FilterType.AMOUNT] && (
                <FilterAmounts
                  filter={localFilters[FilterType.AMOUNT]}
                  handleCheckedChange={handleCheckedChange}
                  handleAmountRange={handleAmountChange}
                />
              )}
            </div>
          </div>

          <DrawerFooter>
            <Button
              className="rounded-3xl h-12 text-base"
              onClick={handleApplyFilters}
              aria-label="Apply filters and close"
              data-testid="apply-filters-button"
            >
              Aplicar filtros
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
