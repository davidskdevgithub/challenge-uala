import { Menu } from 'lucide-react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import { Sidebar } from './sidebar';

export const MobileSidebar = () => {
  return (
    <Drawer direction="left" handleOnly data-testid="mobile-sidebar">
      <DrawerTrigger asChild>
        <button
          aria-label="Mobile menu"
          className="p-3 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
        >
          <Menu className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent
        aria-labelledby="filters-title"
        data-testid="drawer-content"
      >
        <Sidebar />
      </DrawerContent>
    </Drawer>
  );
};
