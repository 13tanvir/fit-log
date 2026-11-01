import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-slate-950 text-white py-16 px-4 lg:px-12 border-b border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-[#ccff00] font-bold text-xs tracking-widest uppercase">
            WORKOUT LIBRARY
          </p>
          
          <h1 className="font-oswald text-4xl sm:text-6xl font-extrabold leading-tight tracking-wide uppercase">
            TRAIN WITH INTENT. <br />
            <span className="text-[#ccff00]">LOG EVERY SET.</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          <div>
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded hover:bg-[#b3e600] transition-colors uppercase text-sm"
            >
              <span>BROWSE WORKOUTS</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Image Illustration */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md h-72 sm:h-96 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
              alt="FitLog Gym Hero"
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}