import type { Metadata } from 'next';
import { PlanProvider } from '@/context/PlanContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitLog — Workout Library & Gym Companion',
  description: 'Train with intent. Log every set.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between antialiased">
        <PlanProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}