import axios from 'axios';
import { Task, Transaction, User, SavingsGoal } from '../context/AppContext.tsx';

const API = 'http://localhost:5000/api';

export function useBackendSync(userId: string = '1') {
  return {
    addTask: async (task: Task) => {
      await axios.post(`${API}/tasks`, { userId, task });
    },

    completeTask: async (taskId: string) => {
      await axios.patch(`${API}/tasks/complete`, { userId, taskId });
    },

    completeMicroTask: async (taskId: string, microTaskId: string) => {
      await axios.patch(`${API}/tasks/completeMicroTask`, { userId, taskId, microTaskId });
    },

    addTransaction: async (transaction: Transaction) => {
      await axios.post(`${API}/users/${userId}/transactions`, transaction);
    },

    updateUser: async (userUpdates: Partial<User>) => {
      await axios.patch(`${API}/users/${userId}`, userUpdates);
    },

    updateSavingsGoal: async (goal: SavingsGoal) => {
      await axios.patch(`${API}/users/${userId}/savings`, goal);
    },

    toggleDarkMode: async (enabled: boolean) => {
      await axios.patch(`${API}/users/${userId}/darkMode`, { darkMode: enabled });
    },

    updateStreak: async (streak: number, lastActiveDate: string) => {
      await axios.patch(`${API}/users/${userId}/streak`, { streak, lastActiveDate });
    },

    unlockBadge: async (badgeId: string) => {
      await axios.patch(`${API}/users/${userId}/badges/${badgeId}`, { unlocked: true });
    }
  };
}