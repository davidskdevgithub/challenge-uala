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

import IconFilter from '@/components/icons/icon-filter';
import { ChevronLeft } from 'lucide-react';

import { useFilters } from '../hooks/useFilters';
import { FilterType } from '../filters.types';
import { FilterAmounts } from './filter-amounts';
import { FilterDate } from './filter-date';
import { FilterChips } from './filter-chips';

export const FiltersDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    storeFilters,
    localFilters,
    currentFilters,
    handleCheckedChange,
    handleDateSelect,
    handleChipSelect,
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
          <DrawerHeader className="px-4 py-4 md:py-12">
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
                <FilterChips
                  filter={localFilters[FilterType.CARD]}
                  filterType={FilterType.CARD}
                  icon="credit-card"
                  title="Tarjeta"
                  handleCheckedChange={handleCheckedChange}
                  handleChipSelect={value =>
                    handleChipSelect(FilterType.CARD, value)
                  }
                />
              )}

              {localFilters[FilterType.INSTALLMENTS] && (
                <FilterChips
                  filter={localFilters[FilterType.INSTALLMENTS]}
                  filterType={FilterType.INSTALLMENTS}
                  icon="receipt"
                  title="Cuotas"
                  handleCheckedChange={handleCheckedChange}
                  handleChipSelect={value =>
                    handleChipSelect(FilterType.INSTALLMENTS, value)
                  }
                />
              )}

              {localFilters[FilterType.AMOUNT] && (
                <FilterAmounts
                  filter={localFilters[FilterType.AMOUNT]}
                  handleCheckedChange={handleCheckedChange}
                  handleAmountRange={handleAmountChange}
                />
              )}

              {localFilters[FilterType.PAYMENT_METHOD] && (
                <FilterChips
                  filter={localFilters[FilterType.PAYMENT_METHOD]}
                  filterType={FilterType.PAYMENT_METHOD}
                  icon="receipt"
                  title="Metodos de cobro"
                  handleCheckedChange={handleCheckedChange}
                  handleChipSelect={value =>
                    handleChipSelect(FilterType.PAYMENT_METHOD, value)
                  }
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
