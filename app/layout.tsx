import type { Metadata } from 'next';
import { Oxanium, Merriweather, Fira_Code } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme-provider';

const fontSans = Oxanium({
  subsets: ['latin'],
  variable: '--font-sans'
});

const fontSerif = Merriweather({
  subsets: ['latin'],
  variable: '--font-serif'
});

const fontMono = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Finance Tracker',
  description: 'Tracking finance made easy'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        `${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
