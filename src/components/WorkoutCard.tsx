'use client';

import Link from 'next/link';
import { Workout } from '@/types/workout';
import { usePlan } from '@/context/PlanContext';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const { addToTodayPlan, addToSaved } = usePlan();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group">
      <div>
        {/* Card Header Image & Badges */}
        <div className="relative h-48 overflow-hidden bg-slate-950">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            <span className="bg-black/80 text-[#ccff00] text-[10px] font-bold px-2 py-0.5 rounded border border-[#ccff00]/30 uppercase tracking-wider">
              {workout.difficulty}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{workout.category.join(', ')}</span>
            <span>•</span>
            <span>{workout.duration} mins</span>
          </div>

          <h3 className="font-oswald text-xl font-bold text-white group-hover:text-[#ccff00] transition-colors">
            {workout.name}
          </h3>

          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
            {workout.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-800/80">
            <div>
              <span className="text-slate-500 block">Sets x Reps</span>
              <span className="font-semibold text-slate-200">
                {workout.sets} x {workout.reps}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Est. Burn</span>
              <span className="font-semibold text-slate-200">
                {workout.calories} kcal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => addToTodayPlan(workout)}
            className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold text-xs py-2 px-3 rounded transition-colors uppercase"
          >
            + Add to Plan
          </button>
          <button
            onClick={() => addToSaved(workout)}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-2 px-3 rounded transition-colors uppercase border border-slate-700"
          >
            Save
          </button>
        </div>

        <Link
          href={`/workout/${workout.id}`}
          className="block text-center text-xs text-slate-400 hover:text-white pt-1 transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
