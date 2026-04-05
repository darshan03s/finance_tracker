import type { Metadata } from 'next';
import { Oxanium, Merriweather, Fira_Code } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/next';
import { DOMAIN_URL } from '@/config';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';

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
  title: 'Finance tracker',
  description: 'Tracking finance made easy',
  keywords: ['Finance', 'Finance tracker'],
  robots: {
    index: true,
    follow: true
  },
  metadataBase: new URL(DOMAIN_URL),
  icons: {
    icon: '/favicon.ico'
  },
  authors: [{ name: 'Darshan S', url: 'https://darshans.site' }],
  creator: 'Darshan S',
  publisher: 'Darshan S',
  applicationName: 'Finance tracker',
  alternates: {
    canonical: DOMAIN_URL
  },
  openGraph: {
    title: 'Finance tracker',
    description: 'Tracking finance made easy',
    url: DOMAIN_URL,
    siteName: 'Finance tracker',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${DOMAIN_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: 'Finance tracker'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance tracker',
    description: 'Tracking finance made easy',
    images: [
      {
        url: `${DOMAIN_URL}/api/twitter-og`,
        width: 1200,
        height: 628,
        alt: 'Finance tracker'
      }
    ]
  }
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
          <TooltipProvider>
            {children}
            <Footer />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
