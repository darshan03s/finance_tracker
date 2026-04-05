import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex items-center justify-center h-12 bg-secondary/30 text-xs text-secondary-foreground/50">
      <span>
        Made by{' '}
        <Link href={'https://darshans.site'} className="font-bold" target="_blank">
          Darshan S
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
