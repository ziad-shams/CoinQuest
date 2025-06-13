import { v4 as uuidv4 } from 'uuid';

// First install uuid and its types using:
// npm install uuid
// npm install --save-dev @types/uuid

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'savings' | 'investment' | 'budgeting' | 'debt' | 'income' | 'custom';
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  requirements?: string[];
  completionCriteria?: string[];
  timeLimit?: number; // in days
  status: 'available' | 'in_progress' | 'completed' | 'failed';
  progress?: number; // 0-100
  customGoal?: number;
  currentValue?: number;
}

export const defaultQuests: Quest[] = [
  {
    id: uuidv4(),
    title: 'Emergency Fund Builder',
    description: 'Start building your emergency fund by saving enough to cover 1 month of expenses',
    category: 'savings',
    difficulty: 'medium',
    xpReward: 500,
    coinReward: 1000,
    requirements: ['Track monthly expenses', 'Open a dedicated savings account'],
    completionCriteria: ['Save 1x monthly expenses'],
    status: 'available',
    progress: 0
  },
  {
    id: uuidv4(),
    title: 'Debt Destroyer',
    description: 'Pay off a specific debt or reduce it by a set percentage',
    category: 'debt',
    difficulty: 'hard',
    xpReward: 1000,
    coinReward: 2000,
    requirements: ['List all debts', 'Choose one to focus on'],
    completionCriteria: ['Reduce chosen debt by 20%'],
    status: 'available',
    progress: 0
  },
  {
    id: uuidv4(),
    title: 'Budget Master',
    description: 'Create and stick to a budget for 30 days',
    category: 'budgeting',
    difficulty: 'medium',
    xpReward: 750,
    coinReward: 1500,
    requirements: ['Create budget categories', 'Set spending limits'],
    timeLimit: 30,
    status: 'available',
    progress: 0
  },
  {
    id: uuidv4(),
    title: 'Investment Initiate',
    description: 'Start your investment journey by researching and choosing an investment vehicle',
    category: 'investment',
    difficulty: 'easy',
    xpReward: 300,
    coinReward: 500,
    requirements: ['Research 3 investment options', 'Compare fees and returns'],
    status: 'available',
    progress: 0
  },
  {
    id: uuidv4(),
    title: 'Side Hustle Hero',
    description: 'Earn extra income through a side gig or freelance work',
    category: 'income',
    difficulty: 'medium',
    xpReward: 600,
    coinReward: 1200,
    requirements: ['Identify skills to monetize', 'Create profile on freelance platform'],
    completionCriteria: ['Earn first $100 from side hustle'],
    status: 'available',
    progress: 0
  },
  {
    id: uuidv4(),
    title: 'Savings Sprint',
    description: 'Save a specific amount in 7 days through reduced spending',
    category: 'savings',
    difficulty: 'easy',
    xpReward: 200,
    coinReward: 400,
    timeLimit: 7,
    status: 'available',
    progress: 0,
    customGoal: 100,
    currentValue: 0
  },
  {
    id: uuidv4(),
    title: 'Investment Portfolio Pioneer',
    description: 'Create a diversified investment portfolio with at least 3 different assets',
    category: 'investment',
    difficulty: 'hard',
    xpReward: 1000,
    coinReward: 2000,
    requirements: ['Research asset classes', 'Understand risk tolerance', 'Create investment strategy'],
    status: 'available',
    progress: 0
  },
  {
    id: uuidv4(),
    title: 'Expense Tracker Expert',
    description: 'Track every expense for 14 days and categorize them',
    category: 'budgeting',
    difficulty: 'easy',
    xpReward: 400,
    coinReward: 800,
    timeLimit: 14,
    status: 'available',
    progress: 0
  },
  {
    id: uuidv4(),
    title: 'Debt Snowball Challenge',
    description: 'Apply the debt snowball method to your debts for 30 days',
    category: 'debt',
    difficulty: 'medium',
    xpReward: 800,
    coinReward: 1600,
    requirements: ['List debts smallest to largest', 'Make minimum payments on all debts', 'Apply extra to smallest debt'],
    timeLimit: 30,
    status: 'available',
    progress: 0
  },
  {
    id: uuidv4(),
    title: 'Passive Income Pathfinder',
    description: 'Set up a passive income stream',
    category: 'income',
    difficulty: 'hard',
    xpReward: 1200,
    coinReward: 2400,
    requirements: ['Research passive income options', 'Create digital product or content', 'Set up distribution channel'],
    status: 'available',
    progress: 0
  }
];

export const createCustomQuest = ({
  title,
  description,
  difficulty,
  customGoal,
  timeLimit
}: {
  title: string;
  description: string;
  difficulty: Quest['difficulty'];
  customGoal?: number;
  timeLimit?: number;
}): Quest => {
  const xpRewards = {
    easy: 200,
    medium: 500,
    hard: 1000
  };

  const coinRewards = {
    easy: 400,
    medium: 1000,
    hard: 2000
  };

  return {
    id: uuidv4(),
    title,
    description,
    category: 'custom',
    difficulty,
    xpReward: xpRewards[difficulty],
    coinReward: coinRewards[difficulty],
    timeLimit,
    status: 'available',
    progress: 0,
    customGoal,
    currentValue: 0
  };
};