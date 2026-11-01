'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import WorkoutCard from '@/components/WorkoutCard';
import { Workout } from '@/types/workout';

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sample API Data / Fetching Simulation
  useEffect(() => {
    // এখানে আমরা স্যাম্পল জিম ওয়ার্কআউট ডাটা সেট করছি
    const sampleWorkouts: Workout[] = [
      {
        id: '1',
        name: 'BARBELL BENCH PRESS',
        category: ['Chest', 'Arms'],
        equipment: ['Barbell', 'Bench'],
        difficulty: 'Intermediate',
        sets: 4,
        reps: '8-10',
        duration: 20,
        calories: 180,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        description: 'The standard heavy chest builder for upper body mass and power.',
        instructions: [
          'Lie flat on bench, eyes under bar.',
          'Grip slightly wider than shoulder width.',
          'Unrack, lower smoothly to mid-chest.',
          'Press upwards to starting position.'
        ]
      },
      {
        id: '2',
        name: 'CONVENTIONAL DEADLIFT',
        category: ['Back', 'Legs'],
        equipment: ['Barbell'],
        difficulty: 'Advanced',
        sets: 3,
        reps: '5',
        duration: 25,
        calories: 220,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        description: 'Full body posteriortrain builder targeting hamstrings, glutes, and back.',
        instructions: [
          'Stand feet hip-width under bar.',
          'Hinge down, grip bar firmly.',
          'Keep spine neutral, pull shoulders back.',
          'Drive through feet to stand up straight.'
        ]
      },
      {
        id: '3',
        name: 'DUMBBELL SHOULDER PRESS',
        category: ['Shoulders', 'Arms'],
        equipment: ['Dumbbells'],
        difficulty: 'Beginner',
        sets: 3,
        reps: '10-12',
        duration: 15,
        calories: 130,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
        description: 'Overhead pressing variation for building round deltoids.',
        instructions: [
          'Sit or stand with dumbbells at shoulder height.',
          'Keep core tight and chest up.',
          'Press weights overhead until arms extend.',
          'Lower under control back to shoulders.'
        ]
      },
      {
        id: '4',
        name: 'BARBELL SQUAT',
        category: ['Legs'],
        equipment: ['Barbell', 'Squat Rack'],
        difficulty: 'Intermediate',
        sets: 4,
        reps: '6-8',
        duration: 25,
        calories: 200,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
        description: 'King of leg exercises for quadriceps, hamstrings, and core stability.',
        instructions: [
          'Rest bar across upper traps.',
          'Set feet shoulder-width apart.',
          'Squat down pushing hips back until thighs parallel.',
          'Drive up through heels to full extension.'
        ]
      }
    ];

    setWorkouts(sampleWorkouts);
    setLoading(false);
  }, []);

  // Filter Logic
  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];

  const filteredWorkouts = workouts.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Main Workout Library Section */}
      <section id="library" className="max-w-7xl mx-auto px-4 lg:px-12 py-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-oswald text-3xl font-extrabold text-white tracking-wide uppercase">
              WORKOUT LIBRARY
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Select exercises and add them to your plan for today.
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search exercise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-[#ccff00] text-white text-sm px-4 py-2.5 rounded outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#ccff00] text-black font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. Workout Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading workouts...</div>
        ) : filteredWorkouts.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No workouts found matching your filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorkouts.map((item) => (
              <WorkoutCard key={item.id} workout={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}