import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware/persist';

interface Pet {
  type: 'cat' | 'dog' | 'rabbit' | 'hamster';
  name: string;
  color: string;
  accessories: string[];
  happiness: number;
  level: number;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  deadline?: Date;
  completed: boolean;
  questId?: string;
}

interface AppState {
  theme: 'light' | 'dark' | 'system';
  pet: Pet;
  goals: Goal[];
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setPet: (pet: Partial<Pet>) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  removeGoal: (id: string) => void;
  addQuestAsGoal: (questId: string, goal: Omit<Goal, 'id' | 'questId'>) => void;
}

const useAppStore = createStore<AppState>(
  persist(
    (set: (fn: (state: AppState) => Partial<AppState>) => void) => ({
      theme: 'system',
      pet: {
        type: 'cat',
        name: 'Coin',
        color: '#9C27B0',
        accessories: [],
        happiness: 80,
        level: 1
      },
      goals: [],

      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set((state) => ({ theme }));
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', systemTheme === 'dark');
        } else {
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }
      },

      setPet: (petUpdates: Partial<Pet>) =>
        set((state) => ({
          pet: { ...state.pet, ...petUpdates }
        })),

      addGoal: (goal: Omit<Goal, 'id'>) =>
        set((state) => ({
          goals: [...state.goals, { ...goal, id: crypto.randomUUID() }]
        })),

      updateGoal: (id: string, updates: Partial<Goal>) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          )
        })),

      removeGoal: (id: string) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id)
        })),

      addQuestAsGoal: (questId: string, goal: Omit<Goal, 'id' | 'questId'>) =>
        set((state) => ({
          goals: [...state.goals, {
            ...goal,
            id: crypto.randomUUID(),
            questId,
            completed: false
          }]
        }))
    }),
    {
      name: 'coinquest-storage',
      partialize: (state: AppState) => ({
        theme: state.theme,
        pet: state.pet,
        goals: state.goals
      })
    }
  )
);

export default useAppStore;