import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterSection } from '../filter-section';

// Mock the lucide-react icons
vi.mock('lucide-react', () => ({
  Calendar: () => <div data-testid="icon-calendar">Calendar Icon</div>,
  CreditCard: () => <div data-testid="icon-credit-card">Credit Card Icon</div>,
  DollarSign: () => <div data-testid="icon-dollar-sign">Dollar Sign Icon</div>,
  FileText: () => <div data-testid="icon-file-text">File Text Icon</div>,
  Receipt: () => <div data-testid="icon-receipt">Receipt Icon</div>,
}));

describe('FilterSection', () => {
  const mockOnCheckedChange = vi.fn();

  const defaultProps = {
    icon: 'calendar' as const,
    title: 'Date Range',
    checked: false,
    onCheckedChange: mockOnCheckedChange,
  };

  beforeEach(() => {
    mockOnCheckedChange.mockReset();
  });

  it('renders with correct content', () => {
    render(<FilterSection {...defaultProps} />);

    // Check if section is rendered
    const sectionId = 'filter-section-date-range';
    const section = screen.getByTestId(sectionId);
    expect(section).toBeDefined();

    // Check if title is rendered
    const title = screen.getByTestId(`${sectionId}-heading`);
    expect(title).toBeDefined();
    expect(title.textContent).toBe('Date Range');

    // Check if icon is rendered
    // The icon is still using the old mock data-testid format
    const icon = screen.getByTestId('icon-calendar');
    expect(icon).toBeDefined();

    // Check if switch is rendered and unchecked
    const switchElement = screen.getByTestId(`${sectionId}-switch`);
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
  });

  it('renders different icons based on the icon prop', () => {
    const { rerender } = render(
      <FilterSection {...defaultProps} icon="credit-card" />,
    );
    expect(screen.getByTestId('icon-credit-card')).toBeDefined();

    rerender(<FilterSection {...defaultProps} icon="receipt" />);
    expect(screen.getByTestId('icon-receipt')).toBeDefined();

    rerender(<FilterSection {...defaultProps} icon="dollar-sign" />);
    expect(screen.getByTestId('icon-dollar-sign')).toBeDefined();

    rerender(<FilterSection {...defaultProps} icon="file-text" />);
    expect(screen.getByTestId('icon-file-text')).toBeDefined();
  });

  it('calls onCheckedChange when switch is toggled', () => {
    render(<FilterSection {...defaultProps} />);

    const sectionId = 'filter-section-date-range';
    const switchElement = screen.getByTestId(`${sectionId}-switch`);
    fireEvent.click(switchElement);

    expect(mockOnCheckedChange).toHaveBeenCalledTimes(1);
    expect(mockOnCheckedChange).toHaveBeenCalledWith(true);
  });

  it('displays children when checked is true', () => {
    render(
      <FilterSection {...defaultProps} checked={true}>
        <div data-testid="child-content">Child Content</div>
      </FilterSection>,
    );

    const childContent = screen.getByTestId('child-content');
    expect(childContent).toBeDefined();

    const sectionId = 'filter-section-date-range';
    const contentContainer = screen.getByTestId(`${sectionId}-content`);
    expect(contentContainer).not.toBeNull();
    expect(contentContainer.getAttribute('aria-hidden')).toBe('false');
  });

  it('hides children when checked is false', () => {
    render(
      <FilterSection {...defaultProps} checked={false}>
        <div data-testid="child-content">Child Content</div>
      </FilterSection>,
    );

    const childContent = screen.getByTestId('child-content');
    expect(childContent).toBeDefined();

    const sectionId = 'filter-section-date-range';
    const contentContainer = screen.getByTestId(`${sectionId}-content`);
    expect(contentContainer).not.toBeNull();
    expect(contentContainer.getAttribute('aria-hidden')).toBe('true');
  });
});
