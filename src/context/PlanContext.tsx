'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout } from '@/types/workout';

interface PlanContextType {
  todayPlan: Workout[];
  savedList: Workout[];
  toastMessage: string | null;
  addToTodayPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromTodayPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // LocalStorage থেকে ডাটা লোড করা
  useEffect(() => {
    const localPlan = localStorage.getItem('fitlog_todayPlan');
    const localSaved = localStorage.getItem('fitlog_savedList');

    if (localPlan) setTodayPlan(JSON.parse(localPlan));
    if (localSaved) setSavedList(JSON.parse(localSaved));
  }, []);

  // LocalStorage-এ সেভ করা
  useEffect(() => {
    localStorage.setItem('fitlog_todayPlan', JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem('fitlog_savedList', JSON.stringify(savedList));
  }, [savedList]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToTodayPlan = (workout: Workout) => {
    const exists = todayPlan.some((item) => item.id === workout.id);
    if (exists) {
      showToast('Already added to Today\'s Plan!');
      return;
    }

    if (todayPlan.length >= 5) {
      showToast('Limit reached! Cap of 5 lifts for Today\'s Plan.');
      return;
    }

    setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
    showToast(`"${workout.name}" added to Today\'s Plan!`);
  };

  const addToSaved = (workout: Workout) => {
    const exists = savedList.some((item) => item.id === workout.id);
    if (exists) {
      showToast('Already saved for later!');
      return;
    }

    setSavedList((prev) => [...prev, workout]);
    showToast(`"${workout.name}" saved for later!`);
  };

  const removeFromTodayPlan = (id: string) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from Today\'s Plan.');
  };

  const removeFromSaved = (id: string) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from Saved list.');
  };

  const markAsDone = (id: string) => {
    setTodayPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
    showToast('Workout status updated! 💪');
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedList,
        toastMessage,
        addToTodayPlan,
        addToSaved,
        removeFromTodayPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
      {toastMessage && (
        <div className="toast toast-bottom toast-end z-50">
          <div className="alert alert-success bg-[#ccff00] text-black font-semibold shadow-lg border-none">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}