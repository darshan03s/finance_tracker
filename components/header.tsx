import Link from 'next/link';
import { ModeToggle } from './mode-toggle';

const Header = () => {
  return (
    <header className="h-12 px-4 flex items-center justify-between border-b">
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
