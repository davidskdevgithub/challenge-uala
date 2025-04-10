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

export const FiltersDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = () => {
    setIsOpen(false);
  };

  return (
    <Drawer direction="right" handleOnly open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <IconFilter />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md h-full flex flex-col">
          <DrawerHeader className="px-4 py-12">
            <div className="flex items-center gap-4">
              <DrawerClose>
                <ChevronLeft className="h-5 w-5" />
              </DrawerClose>
              <DrawerTitle className="text-base font-semibold text-neutral-dark">
                Filtros
              </DrawerTitle>
            </div>
          </DrawerHeader>

          <div className="p-4 pb-0 overflow-y-auto">
            <div className="h-12 flex justify-between items-center mb-2">
              <h2 className="font-semibold text-neutral-dark text-base">
                Todos los filtros
              </h2>
              <Button
                variant="link"
                className="font-light text-primary-blue text-base"
              >
                Limpiar
              </Button>
            </div>
          </div>

          <DrawerFooter>
            <Button
              className="rounded-3xl h-12 text-base"
              onClick={handleApplyFilters}
            >
              Aplicar filtros
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
