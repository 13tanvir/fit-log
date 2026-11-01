import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-6 px-4 lg:px-12 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#ccff00] text-black font-extrabold flex items-center justify-center rounded text-xs">
            F
          </div>
          <span className="font-oswald text-lg font-bold text-white tracking-wider">
            FITLOG
          </span>
        </div>

        {/* Right: Copyright Text */}
        <p className="text-slate-500 text-xs text-center sm:text-right">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}