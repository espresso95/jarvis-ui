import Navbar from 'src/components/Navbar';
import SplashScreen from 'src/components/SplashScreen';
import './globals.css';

// Metadata moved to head for client component compatibility

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'var(--font-sans)',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <SplashScreen />
        <Navbar />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
