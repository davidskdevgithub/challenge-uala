import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FiltersDrawer } from '../filters-drawer';
import { FilterType } from '../../filters.types';
import * as useFiltersModule from '../../hooks/useFilters';
import { CardValue } from '@/modules/transactions/transactions.types';

// Mock the useFilters hook
const applyFiltersSpy = vi.fn();
vi.mock('../hooks/useFilters', () => ({
  useFilters: () => ({
    storeFilters: {},
    localFilters: {
      [FilterType.CARD]: {
        checked: false,
        options: [
          { value: 'card1', label: 'Card 1', isSelected: true },
          { value: 'card2', label: 'Card 2', isSelected: false },
          { value: 'card3', label: 'Card 3', isSelected: false },
        ],
      },
    },
    currentFilters: {},
    handleCheckedChange: vi.fn(),
    handleDateSelect: vi.fn(),
    handleCardSelect: vi.fn(),
    handleAmountChange: vi.fn(),
    applyFilters: applyFiltersSpy,
  }),
}));

// Mock the child components
vi.mock('../filter-section', () => ({
  FilterSection: vi
    .fn()
    .mockImplementation(
      ({
        children,
        title,
        checked,
        onCheckedChange,
        'data-testid': dataTestId,
      }) => (
        <div
          data-testid={dataTestId || 'filter-section'}
          data-title={title}
          data-checked={checked}
        >
          <button
            data-testid="toggle-filter"
            onClick={() => onCheckedChange(!checked)}
          >
            Toggle
          </button>
          {checked && <div data-testid="filter-content">{children}</div>}
        </div>
      ),
    ),
}));

// Mock the icons
vi.mock('@/components/icons/icon-filter', () => ({
  default: () => <div data-testid="icon-filter">Filter Icon</div>,
}));

vi.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="icon-chevron-left">Chevron Left</div>,
  X: () => <div data-testid="icon-x">X</div>,
}));

// Mock the UI components
vi.mock('@/components/ui/drawer', () => ({
  Drawer: vi
    .fn()
    .mockImplementation(
      ({ children, open, onOpenChange, 'data-testid': dataTestId }) => (
        <div data-testid={dataTestId || 'drawer'} data-open={open}>
          {children}
          <button
            data-testid="toggle-drawer"
            onClick={() => onOpenChange(!open)}
          >
            Toggle Drawer
          </button>
        </div>
      ),
    ),
  DrawerTrigger: vi
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid="drawer-trigger">{children}</div>
    )),
  DrawerContent: vi
    .fn()
    .mockImplementation(({ children, 'data-testid': dataTestId }) => (
      <div data-testid={dataTestId || 'drawer-content'}>{children}</div>
    )),
  DrawerHeader: vi
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid="drawer-header">{children}</div>
    )),
  DrawerTitle: vi
    .fn()
    .mockImplementation(({ children, id, 'data-testid': dataTestId }) => (
      <div data-testid={dataTestId || 'drawer-title'} id={id}>
        {children}
      </div>
    )),
  DrawerClose: vi
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid="drawer-close">{children}</div>
    )),
  DrawerFooter: vi
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid="drawer-footer">{children}</div>
    )),
}));

vi.mock('@/components/ui/button', () => ({
  Button: vi
    .fn()
    .mockImplementation(({ children, onClick, 'data-testid': dataTestId }) => (
      <button data-testid={dataTestId || 'button'} onClick={onClick}>
        {children}
      </button>
    )),
}));

vi.mock('@/components/ui/badge', () => ({
  Badge: vi
    .fn()
    .mockImplementation(
      ({
        children,
        onClick,
        variant,
        role,
        'aria-pressed': ariaPressed,
        'data-testid': dataTestId,
      }) => (
        <span
          data-testid={dataTestId || 'badge'}
          data-variant={variant}
          data-role={role}
          data-aria-pressed={ariaPressed}
          onClick={onClick}
        >
          {children}
        </span>
      ),
    ),
}));

describe('FiltersDrawer', () => {
  it('renders the filter button correctly', () => {
    render(<FiltersDrawer />);

    const filterButton = screen.getByTestId('filter-button');
    expect(filterButton).toBeDefined();

    const filterIcon = screen.getByTestId('icon-filter');
    expect(filterIcon).toBeDefined();
  });

  it('opens the drawer when filter button is clicked', () => {
    render(<FiltersDrawer />);

    // Initially drawer should be closed
    const drawer = screen.getByTestId('filters-drawer');
    expect(drawer.getAttribute('data-open')).toBe('false');

    // Click the toggle button to simulate opening
    const toggleButton = screen.getByTestId('toggle-drawer');
    fireEvent.click(toggleButton);

    // Drawer should now be open
    expect(drawer.getAttribute('data-open')).toBe('true');
  });

  it('renders the drawer content correctly', () => {
    render(<FiltersDrawer />);

    // Open the drawer
    const toggleButton = screen.getByTestId('toggle-drawer');
    fireEvent.click(toggleButton);

    // Check drawer content
    expect(screen.getByTestId('drawer-content')).toBeDefined();
    expect(screen.getByTestId('drawer-container')).toBeDefined();
    expect(screen.getByTestId('drawer-title')).toBeDefined();
    expect(screen.getByText('Filtros')).toBeDefined();
    expect(screen.getByTestId('filters-heading')).toBeDefined();
    expect(screen.getByTestId('clear-filters-button')).toBeDefined();
    expect(screen.getByTestId('apply-filters-button')).toBeDefined();
  });

  // TODO: Fix this test after complete all the sections
  // it('renders the filter section correctly', () => {
  //   render(<FiltersDrawer />);

  //   // Open the drawer
  //   const toggleButton = screen.getByTestId('toggle-drawer');
  //   fireEvent.click(toggleButton);

  //   const cardFilterSection = screen.getByTestId('card-filter-section');
  //   expect(cardFilterSection).toBeDefined();
  //   expect(cardFilterSection.getAttribute('data-title')).toBe('Tarjeta');
  //   expect(cardFilterSection.getAttribute('data-checked')).toBe('false');

  //   const dateFilterSection = screen.getByTestId('date-filter-section');
  //   expect(dateFilterSection).toBeDefined();
  //   expect(dateFilterSection.getAttribute('data-title')).toBe('Fecha');
  //   expect(dateFilterSection.getAttribute('data-checked')).toBe('false');
  // });

  it('closes the drawer when apply button is clicked', () => {
    // Create a fresh spy for this test
    const applyFiltersSpy = vi.fn();

    // Mock the useFilters hook with a direct spy
    vi.spyOn(useFiltersModule, 'useFilters').mockReturnValue({
      storeFilters: {},
      localFilters: {
        [FilterType.CARD]: {
          checked: false,
          options: [
            { value: CardValue.VISA, label: 'Card 1', isSelected: true },
            { value: CardValue.MASTERCARD, label: 'Card 2', isSelected: false },
            { value: CardValue.AMEX, label: 'Card 3', isSelected: false },
          ],
        },
      },
      currentFilters: {},
      handleCheckedChange: vi.fn(),
      handleDateSelect: vi.fn(),
      handleCardSelect: vi.fn(),
      handleAmountChange: vi.fn(),
      applyFilters: applyFiltersSpy, // Use our local spy
    });

    render(<FiltersDrawer />);

    // Open the drawer
    const toggleButton = screen.getByTestId('toggle-drawer');
    fireEvent.click(toggleButton);

    // Drawer should be open
    const drawer = screen.getByTestId('filters-drawer');
    expect(drawer.getAttribute('data-open')).toBe('true');

    // Click apply button
    const applyButton = screen.getByTestId('apply-filters-button');
    fireEvent.click(applyButton);

    // Check if applyFilters was called
    expect(applyFiltersSpy).toHaveBeenCalled();

    // Drawer should now be closed
    expect(drawer.getAttribute('data-open')).toBe('false');
  });
});
