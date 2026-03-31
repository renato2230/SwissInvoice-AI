import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Swiss SaaS | Elite Swiss QR-Bill & Financial Suite',
  description: 'The ultimate SaaS for Swiss business automation. Fast, secure, and compliant with Swiss banking standards.',
  openGraph: {
    title: 'Swiss SaaS Elite',
    description: 'Empowering your enterprise with Swiss precision.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout-root">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
