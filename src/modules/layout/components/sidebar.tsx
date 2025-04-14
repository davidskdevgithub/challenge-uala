import { Home, BarChart2 } from 'lucide-react';
import IconUalaWithIsologo from '@/components/icons/icon-uala-with-isologo';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

function SidebarItem({ icon, label, href, active }: SidebarItemProps) {
  return (
    <a
      href={href}
      className={`flex items-center h-12 p-2 text-sm font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue ${active ? 'text-primary-blue' : 'text-gray-700'}`}
      aria-current={active ? 'page' : undefined}
    >
      <span className="flex items-center">
        {icon}
        <span>{label}</span>
      </span>
    </a>
  );
}

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside
      className={`min-w-2xs h-screen bg-white shadow-sidebar ${className || ''}`}
    >
      <div className="flex flex-col justify-between w-full h-full p-5">
        <div className="flex flex-col">
          <IconUalaWithIsologo />
          <nav className="space-y-1 mt-5" aria-label="Main Navigation">
            <SidebarItem
              icon={<Home className="mr-3 h-5 w-5" aria-hidden="true" />}
              label="Inicio"
              href="#"
              active={true}
            />
            <SidebarItem
              icon={<BarChart2 className="mr-3 h-5 w-5" aria-hidden="true" />}
              label="Métricas"
              href="#"
              active={false}
            />
          </nav>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-lg font-semibold">Descargá la app desde</h3>
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://apps.apple.com/ar/app/ual%C3%A1/id1279808159"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on App Store"
              className="focus:outline-none focus:ring-2 focus:ring-primary-blue rounded"
            >
              <img
                src="/download-on-app-store.png"
                alt="Download on App Store"
                className="h-auto"
                width={140}
                height={42}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=ar.com.bancar.uala&hl=es_US&gl=AR"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on Google Play"
              className="focus:outline-none focus:ring-2 focus:ring-primary-blue rounded"
            >
              <img
                src="/download-on-google-play.png"
                alt="Download on Google Play"
                className="h-auto"
                width={140}
                height={42}
              />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
