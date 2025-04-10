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
    >
      <div className="h-12 flex items-center justify-between py-2 pl-2 pr-4">
        <div className="flex items-center gap-2">
          <IconComponent className="h-5 w-5 text-gray-500" aria-hidden="true" />
          <h3
            id={`${sectionId}-heading`}
            className="text-sm font-semibold text-neutral-hard m-0"
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
        />
      </div>
      <div id={`${sectionId}-content`} aria-hidden={!checked}>
        {children}
      </div>
    </section>
  );
}
