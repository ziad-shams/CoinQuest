
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  lastActiveDate: string;
  selectedPet: 'cat' | 'plant' | 'dragon';
  petAccessories: string[];
  darkMode: boolean;
  reminderTime: string;
  fontSize: 'normal' | 'large';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  microTasks: MicroTask[];
  category: 'financial' | 'personal' | 'work' | 'health';
}

export interface MicroTask {
  id: string;
  title: string;
  completed: boolean;
  xp: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredXP: number;
  category: 'streak' | 'xp' | 'tasks' | 'financial';
}

export interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  method: 'cash' | 'credit';
  date: string;
  category: string;
}

export interface AppState {
  user: User;
  tasks: Task[];
  badges: Badge[];
  transactions: Transaction[];
  savingsGoal: {
    target: number;
    current: number;
    title: string;
  };
  cashBalance: number;
  creditBalance: number;
}

export interface SavingsGoal {
  target: number;
  current: number;
  title: string;
}

type AppAction =
  | { type: 'COMPLETE_TASK'; taskId: string }
  | { type: 'COMPLETE_MICROTASK'; taskId: string; microTaskId: string }
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'ADD_TRANSACTION'; transaction: Transaction }
  | { type: 'UPDATE_USER'; user: Partial<User> }
  | { type: 'UPDATE_SAVINGS_GOAL'; goal: { target: number; current: number; title: string } }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'UPDATE_STREAK' }
  | { type: 'UNLOCK_BADGE'; badgeId: string }
  | { type: "SET_TASKS"; tasks: Task[] }
  | { type: "SET_BADGES"; badges: Badge[] }
  | { type: 'SET_TRANSACTIONS'; transactions: Transaction[] }
  | { type: 'UPDATE_CASH_BALANCE'; cashBalance: number }
  | { type: 'UPDATE_CREDIT_BALANCE'; creditBalance: number };

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Quest Hero',
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    selectedPet: 'cat',
    petAccessories: [],
    darkMode: false,
    reminderTime: '09:00',
    fontSize: 'normal'
  },
  tasks: [
    {
      id: '1',
      title: 'Set up monthly budget',
      description: 'Create a comprehensive monthly budget to track income and expenses',
      xp: 50,
      completed: false,
      priority: 'high',
      dueDate: new Date().toISOString().split('T')[0],
      category: 'financial',
      microTasks: [
        { id: '1-1', title: 'List all income sources', completed: false, xp: 10 },
        { id: '1-2', title: 'Track fixed expenses', completed: false, xp: 15 },
        { id: '1-3', title: 'Identify variable expenses', completed: false, xp: 15 },
        { id: '1-4', title: 'Set spending limits', completed: false, xp: 10 }
      ]
    },
    {
      id: '2',
      title: 'Pay utility bills',
      description: 'Pay electricity, water, and internet bills for this month',
      xp: 30,
      completed: false,
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      category: 'financial',
      microTasks: [
        { id: '2-1', title: 'Check electricity bill', completed: false, xp: 10 },
        { id: '2-2', title: 'Pay water bill', completed: false, xp: 10 },
        { id: '2-3', title: 'Pay internet bill', completed: false, xp: 10 }
      ]
    },
    {
      id: '3',
      title: 'Review investment portfolio',
      description: 'Check and rebalance investment portfolio',
      xp: 75,
      completed: false,
      priority: 'low',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      category: 'financial',
      microTasks: [
        { id: '3-1', title: 'Log into investment account', completed: false, xp: 10 },
        { id: '3-2', title: 'Review current allocations', completed: false, xp: 25 },
        { id: '3-3', title: 'Research market trends', completed: false, xp: 25 },
        { id: '3-4', title: 'Make adjustments if needed', completed: false, xp: 15 }
      ]
    }
  ],
  badges: [
    { id: '1', title: 'First Steps', description: 'Complete your first task', icon: '🌟', unlocked: false, requiredXP: 10, category: 'tasks' },
    { id: '2', title: 'Streak Starter', description: 'Maintain a 3-day streak', icon: '🔥', unlocked: false, requiredXP: 0, category: 'streak' },
    { id: '3', title: 'XP Collector', description: 'Earn 100 XP', icon: '💎', unlocked: false, requiredXP: 100, category: 'xp' },
    { id: '4', title: 'Financial Wizard', description: 'Complete 5 financial tasks', icon: '🧙‍♂️', unlocked: false, requiredXP: 0, category: 'financial' },
    { id: '5', title: 'Level Up!', description: 'Reach level 2', icon: '⭐', unlocked: false, requiredXP: 100, category: 'xp' },
    { id: '6', title: 'Consistency King', description: 'Maintain a 7-day streak', icon: '👑', unlocked: false, requiredXP: 0, category: 'streak' }
  ],
  transactions: [],
  savingsGoal: {
    target: 1000,
    current: 0,
    title: 'Emergency Fund'
  },
  cashBalance: 0,
  creditBalance: 0
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'COMPLETE_TASK':
      const task = state.tasks.find(t => t.id === action.taskId);
      if (!task || task.completed) return state;
      
      const updatedTasks = state.tasks.map(t =>
        t.id === action.taskId ? { ...t, completed: true } : t
      );
      
      const newXP = state.user.xp + task.xp;
      const newLevel = Math.floor(newXP / 100) + 1;
      
      return {
        ...state,
        tasks: updatedTasks,
        user: {
          ...state.user,
          xp: newXP,
          level: newLevel,
          xpToNextLevel: (newLevel * 100) - newXP
        }
      };

    case 'COMPLETE_MICROTASK':
      const taskWithMicro = state.tasks.find(t => t.id === action.taskId);
      if (!taskWithMicro) return state;
      
      const microTask = taskWithMicro.microTasks.find(mt => mt.id === action.microTaskId);
      if (!microTask || microTask.completed) return state;
      
      const updatedTasksWithMicro = state.tasks.map(t =>
        t.id === action.taskId
          ? {
              ...t,
              microTasks: t.microTasks.map(mt =>
                mt.id === action.microTaskId ? { ...mt, completed: true } : mt
              )
            }
          : t
      );
      
      const microXP = state.user.xp + microTask.xp;
      const microLevel = Math.floor(microXP / 100) + 1;
      
      return {
        ...state,
        tasks: updatedTasksWithMicro,
        user: {
          ...state.user,
          xp: microXP,
          level: microLevel,
          xpToNextLevel: (microLevel * 100) - microXP
        }
      };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      };

    case 'ADD_TRANSACTION':
      const newBalance = action.transaction.method === 'cash' 
        ? action.transaction.type === 'income' 
          ? state.cashBalance + action.transaction.amount
          : state.cashBalance - action.transaction.amount
        : state.cashBalance;
      
      const newCreditBalance = action.transaction.method === 'credit'
        ? action.transaction.type === 'income'
          ? state.creditBalance + action.transaction.amount
          : state.creditBalance - action.transaction.amount
        : state.creditBalance;

      return {
        ...state,
        transactions: [...state.transactions, action.transaction],
        cashBalance: newBalance,
        creditBalance: newCreditBalance
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.user }
      };

    case 'UPDATE_SAVINGS_GOAL':
      return {
        ...state,
        savingsGoal: action.goal
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        user: { ...state.user, darkMode: !state.user.darkMode }
      };

    case 'UPDATE_STREAK':
      const today = new Date().toISOString().split('T')[0];
      const lastActive = new Date(state.user.lastActiveDate);
      const todayDate = new Date(today);
      const diffTime = todayDate.getTime() - lastActive.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      let newStreak = state.user.streak;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
      
      return {
        ...state,
        user: {
          ...state.user,
          streak: newStreak,
          lastActiveDate: today
        }
      };

    case 'UNLOCK_BADGE':
      return {
        ...state,
        badges: state.badges.map(badge =>
          badge.id === action.badgeId ? { ...badge, unlocked: true } : badge
        )
      };
    
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.tasks
      };
    
    case 'SET_BADGES':
      return {
        ...state,
        badges: action.badges
      }

    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.transactions
      }

    case 'UPDATE_CASH_BALANCE':
      return {
        ...state,
        cashBalance: action.cashBalance
      }

    case 'UPDATE_CREDIT_BALANCE':
      return {
        ...state,
        creditBalance: action.creditBalance
      }
      
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/1');
        const data = response.data;
  
        if (data.user) {
          dispatch({ type: 'UPDATE_USER', user: data.user });
        }
        if (data.tasks) {
          dispatch({ type: 'SET_TASKS', tasks: data.tasks });
        }
        if (data.badges) {
          dispatch({ type: 'SET_BADGES', badges: data.badges });
        }
        if (data.transactions) {
          dispatch({ type: 'SET_TRANSACTIONS', transactions: data.transactions });
        }
        if (data.savingsGoal) {
          dispatch({ type: 'UPDATE_SAVINGS_GOAL', goal: data.savingsGoal });
        }
        if (data.cashBalance !== undefined) {
          dispatch({ type: 'UPDATE_CASH_BALANCE', cashBalance: data.cashBalance });
        }
        if (data.creditBalance !== undefined) {
          dispatch({ type: 'UPDATE_CREDIT_BALANCE', creditBalance: data.creditBalance });
        }

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem('coinquest-state', JSON.stringify(state));
    
    // Apply dark mode
    if (state.user.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

