import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TEST_USER = {
  id: 1,
  name: 'Name',
  avatar_url: '/avatar-placeholder.png',
};

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={`border-b bg-white ${className || ''}`}
      role="banner"
      aria-label="Desktop header"
    >
      <div className="flex items-center gap-8 h-20 px-5 py-6">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={TEST_USER.avatar_url}
            alt={`${TEST_USER.name}'s profile`}
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="text-base font-semibold">{TEST_USER.name}</span>
      </div>
    </header>
  );
};
