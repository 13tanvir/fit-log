'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedList } = usePlan();

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 px-4 lg:px-12 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ccff00] text-black font-extrabold flex items-center justify-center rounded">
            F
          </div>
          <span className="font-oswald text-xl tracking-wider font-bold text-white">
            FITLOG
          </span>
        </Link>

        {/* Middle: Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`font-semibold text-sm transition-colors ${
              pathname === '/' ? 'text-[#ccff00]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`font-semibold text-sm transition-colors ${
              pathname === '/my-plan' ? 'text-[#ccff00]' : 'text-slate-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right: Badge Counters */}
        <div className="flex items-center gap-3">
          {/* Plan Badge (Filled Accent Pill) */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-[#ccff00] text-black font-bold px-3 py-1 rounded-full text-xs"
          >
            <span>Plan</span>
            <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {todayPlan.length}
            </span>
          </Link>

          {/* Saved Badge (Outline Pill) */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 border border-slate-600 text-white font-semibold px-3 py-1 rounded-full text-xs hover:border-[#ccff00]"
          >
            <span>Saved</span>
            <span className="bg-slate-800 text-[#ccff00] w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {savedList.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}