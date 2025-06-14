import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  subtasks?: Task[];
}

interface Badge {
  id: string;
  name: string;
  unlocked: boolean;
}

interface Reward {
  id: string;
  name: string;
  cost: number; // XP cost to redeem
  redeemed: boolean;
}

interface AppState {
  xp: number;
  level: number;
  streak: number;
  tasks: Task[];
  badges: Badge[];
  rewards: Reward[];
  savingsGoal: number;
  currentSavings: number;
  goalReached: boolean;
  lastTaskDate: string | null;

  completeTask: (taskId: string) => void;
  resetTasks: () => void;
  updateSavings: (amount: number) => void;
  setSavingsGoal: (goal: number) => void;
  unlockBadge: (badgeId: string) => void;
  checkForBadgeUnlocks: () => void;
  redeemReward: (rewardId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 0,
      streak: 0,
      tasks: [],
      badges: [],
      rewards: [
        { id: 'coffee', name: 'Free Coffee', cost: 100, redeemed: false },
        { id: 'movie', name: 'Movie Night', cost: 250, redeemed: false },
      ],
      savingsGoal: 0,
      currentSavings: 0,
      goalReached: false,
      lastTaskDate: null,

      resetTasks: () => set({ tasks: [] }),

      checkForBadgeUnlocks: () => {
        const { level, currentSavings, streak, badges } = get();
        const updatedBadges = badges.map(badge => {
          if (!badge.unlocked) {
            if (badge.name === 'Level 5 Reached' && level >= 5) {
              return { ...badge, unlocked: true };
            }
            if (badge.name === 'Savings Hero' && currentSavings >= 1000) {
              return { ...badge, unlocked: true };
            }
            if (badge.name === '3-Day Streak' && streak >= 3) {
              return { ...badge, unlocked: true };
            }
          }
          return badge;
        });
        set({ badges: updatedBadges });
      },

      completeTask: (taskId: string) => {
        const tasks = get().tasks;
        let newXp = get().xp;
        let updated = false;
        const today = new Date().toISOString().split('T')[0];
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId && !task.completed) {
            updated = true;
            newXp += 10;
            return { ...task, completed: true };
          }
          return task;
        });

        if (updated) {
          const newLevel = Math.floor(newXp / 100) + 1;
          let newStreak = get().streak;
          const lastDate = get().lastTaskDate;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          if (lastDate === null) {
            newStreak = 1;
          } else if (lastDate === yesterdayStr) {
            newStreak += 1;
          } else if (lastDate !== today) {
            newStreak = 1;
          }

          set({
            tasks: updatedTasks,
            xp: newXp,
            level: newLevel,
            streak: newStreak,
            lastTaskDate: today,
          });

          get().checkForBadgeUnlocks();
        }
      },

      setSavingsGoal: (goal: number) => {
        set(() => ({
          savingsGoal: goal,
          goalReached: false,
        }));
      },

      updateSavings: (amount: number) => {
        set(state => {
          const newSavings = state.currentSavings + amount;
          const goalReached = newSavings >= state.savingsGoal;
          return {
            currentSavings: newSavings,
            goalReached,
          };
        });
        get().checkForBadgeUnlocks();
      },

      unlockBadge: (badgeId: string) => {
        const badges = get().badges;
        const updatedBadges = badges.map(badge =>
          badge.id === badgeId ? { ...badge, unlocked: true } : badge
        );
        set({ badges: updatedBadges });
      },

      redeemReward: (rewardId: string) => {
        const state = get();
        const reward = state.rewards.find(r => r.id === rewardId);
        if (!reward || reward.redeemed || state.xp < reward.cost) return;

        const updatedRewards = state.rewards.map(r =>
          r.id === rewardId ? { ...r, redeemed: true } : r
        );

        set({
          xp: state.xp - reward.cost,
          rewards: updatedRewards,
        });
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
