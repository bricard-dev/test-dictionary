import { Container, Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { inter } from './fonts';
import Footer from './Footer';
import './globals.css';
import Header from './Header';

export const metadata: Metadata = {
  title: 'Test Dictionary',
  description:
    'This app is a test dictionary that allows users to search for definitions of words.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme>
          <Header />
          <Container role="main" size="2" minHeight="100vh">
            {children}
          </Container>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
