import { MobileSidebar } from './mobile-sidebar';
import IconUalaLogo from '@/components/icons/icon-uala-logo';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ className }) => {
  return (
    <header
      className={`flex flex-col items-end ${className || ''}`}
      role="banner"
      aria-label="Mobile header"
    >
      <div className="grid grid-cols-3 items-center w-full min-h-14 px-1 py-2 border-b bg-white rounded-l-4xl">
        <div className="justify-self-start">
          <MobileSidebar />
        </div>
        <div className="justify-self-center">
          <IconUalaLogo className="h-6" role="img" aria-label="Ualá logo" />
        </div>
      </div>
      <div
        className="relative w-8 h-8 bg-white overflow-hidden -mt-px"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gray border-t border-r rounded-tr-full"></div>
      </div>
    </header>
  );
};
