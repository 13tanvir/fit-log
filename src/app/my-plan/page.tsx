'use client';

import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';

export default function MyPlanPage() {
  const {
    todayPlan,
    savedList,
    removeFromTodayPlan,
    removeFromSaved,
    markAsDone,
    addToTodayPlan,
  } = usePlan();

  // Calculate Progress Stats
  const completedCount = todayPlan.filter((item) => item.isDone).length;
  const progressPercent =
    todayPlan.length > 0 ? Math.round((completedCount / todayPlan.length) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-12 py-10 space-y-12">
      {/* Header & Progress Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-oswald text-3xl md:text-4xl font-extrabold text-white tracking-wide uppercase">
            MY LOG & WORKOUT PLAN
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Track today's lifts, log sets completed, and manage your saved workouts.
          </p>
        </div>

        {/* Progress Tracker Widget */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg w-full md:w-64 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">Today's Progress</span>
            <span className="text-[#ccff00]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#ccff00] h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-500 text-right">
            {completedCount} of {todayPlan.length} completed
          </p>
        </div>
      </div>

      {/* SECTION 1: TODAY'S PLAN */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-oswald text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <span>TODAY'S PLAN</span>
            <span className="text-xs bg-[#ccff00] text-black font-bold px-2 py-0.5 rounded-full">
              {todayPlan.length}/5
            </span>
          </h2>
          <Link
            href="/"
            className="text-xs text-[#ccff00] hover:underline font-semibold"
          >
            + Browse Library
          </Link>
        </div>

        {todayPlan.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-8 text-center space-y-3">
            <p className="text-slate-400 text-sm">Your workout log for today is empty.</p>
            <Link
              href="/"
              className="inline-block bg-[#ccff00] text-black font-bold text-xs px-4 py-2 rounded uppercase hover:bg-[#b3e600] transition-colors"
            >
              Add Exercises
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {todayPlan.map((item) => (
              <div
                key={item.id}
                className={`bg-slate-900 border rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
                  item.isDone ? 'border-[#ccff00]/40 bg-slate-900/60' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-950 border border-slate-800"
                  />
                  <div>
                    <h3
                      className={`font-oswald text-lg font-bold ${
                        item.isDone ? 'line-through text-slate-500' : 'text-white'
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {item.sets} sets × {item.reps} reps • {item.duration} mins
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={() => markAsDone(item.id)}
                    className={`text-xs font-bold px-4 py-2 rounded transition-colors uppercase ${
                      item.isDone
                        ? 'bg-slate-800 text-slate-400 hover:text-white'
                        : 'bg-[#ccff00] text-black hover:bg-[#b3e600]'
                    }`}
                  >
                    {item.isDone ? '✓ Completed' : 'Mark as Done'}
                  </button>
                  <button
                    onClick={() => removeFromTodayPlan(item.id)}
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: SAVED WORKOUTS */}
      <section className="space-y-4 pt-6 border-t border-slate-800">
        <h2 className="font-oswald text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
          <span>SAVED FOR LATER</span>
          <span className="text-xs bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full">
            {savedList.length}
          </span>
        </h2>

        {savedList.length === 0 ? (
          <p className="text-slate-500 text-sm italic">No saved workouts for later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedList.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover bg-slate-950"
                  />
                  <div>
                    <h4 className="font-oswald text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">{item.category.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToTodayPlan(item)}
                    className="text-xs bg-[#ccff00] text-black font-bold px-3 py-1.5 rounded hover:bg-[#b3e600] transition-colors uppercase"
                  >
                    + Plan
                  </button>
                  <button
                    onClick={() => removeFromSaved(item.id)}
                    className="text-xs text-slate-500 hover:text-rose-400 px-2 py-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}