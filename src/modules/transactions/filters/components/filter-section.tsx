import type { ReactNode } from 'react';
import { Switch } from '@/components/ui/switch';
import {
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  Receipt,
} from 'lucide-react';

export interface FilterSectionProps {
  icon: 'calendar' | 'credit-card' | 'receipt' | 'dollar-sign' | 'file-text'; //TODO: replace with icons from Figma
  title: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children?: ReactNode;
}

export function FilterSection({
  icon,
  title,
  checked,
  onCheckedChange,
  children,
}: FilterSectionProps) {
  const IconComponent = {
    calendar: Calendar,
    'credit-card': CreditCard,
    receipt: Receipt,
    'dollar-sign': DollarSign,
    'file-text': FileText,
  }[icon];

  const sectionId = `filter-section-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section
      className="h-auto min-h-12 flex flex-col justify-center"
      aria-labelledby={`${sectionId}-heading`}
      data-testid={sectionId}
    >
      <div
        className="h-12 flex items-center justify-between py-2 pl-2 pr-4"
        data-testid="filter-section-header"
      >
        <div
          className="flex items-center gap-2"
          data-testid="filter-section-title-container"
        >
          <IconComponent
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
            data-testid={`${sectionId}-icon`}
          />
          <h3
            id={`${sectionId}-heading`}
            className="text-sm font-semibold text-neutral-hard m-0"
            data-testid={`${sectionId}-heading`}
          >
            {title}
          </h3>
        </div>
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          id={`${sectionId}-switch`}
          aria-labelledby={`${sectionId}-heading`}
          aria-controls={`${sectionId}-content`}
          aria-expanded={checked}
          data-testid={`${sectionId}-switch`}
        />
      </div>
      <div
        id={`${sectionId}-content`}
        aria-hidden={!checked}
        data-testid={`${sectionId}-content`}
      >
        {children}
      </div>
    </section>
  );
}
