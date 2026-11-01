export interface Workout {
  _id?: string;
  id: string;
  name: string;
  category: string[];
  equipment: string[];
  difficulty: string;
  sets: number;
  reps: string;
  duration: number; // in minutes
  calories: number; // in kcal
  rating: number;
  image: string;
  description: string;
  instructions: string[];
  isDone?: boolean; // Challenge Feature
}