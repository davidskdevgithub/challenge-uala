import { MobileHeader } from './mobile-header';
import { Sidebar } from './sidebar';
import { Header } from './header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray flex flex-col">
      <MobileHeader className="md:hidden" />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar className="hidden md:flex" />
        <main className="flex-1 flex flex-col items-stretch overflow-hidden">
          <Header className="hidden md:block" />
          <div
            className="overflow-y-auto h-[calc(100vh-64px)]"
            role="region"
            aria-label="Main content"
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
