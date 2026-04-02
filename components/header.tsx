import Link from 'next/link';
import { ModeToggle } from './mode-toggle';

const Header = () => {
  return (
    <header className="h-12 px-4 flex items-center justify-between border-b sticky z-10 top-0 bg-background/60 backdrop-blur-sm border-white/10 shadow-sm">
      <div className="header-left">
        <Link href={'/'}>Finance Tracker</Link>
      </div>
      <div className="header-right">
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
