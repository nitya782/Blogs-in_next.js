import './globals.css'; // your global CSS or Tailwind
import Navbar from '@/components/Navbar';
import Dropdown from '@/components/Dropdown';
import WideDiv from '@/components/WideDiv';

export const metadata = {
  title: 'My Blog Site',
  description: 'A modern Next.js blog',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Dropdown />
        <main>{children}</main>
        <WideDiv />
      </body>
    </html>
  );
}

