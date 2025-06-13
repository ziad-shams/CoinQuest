interface MicroTask {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  microTasks: MicroTask[];
  totalXP: number;
}

// Difficulty weights for XP calculation
const DIFFICULTY_WEIGHTS = {
  easy: 1,
  medium: 2,
  hard: 3
};

// Base XP values for different task categories
const CATEGORY_BASE_XP = {
  savings: 100,
  investment: 150,
  budgeting: 120,
  debt: 130
};

// Priority multipliers
const PRIORITY_MULTIPLIERS = {
  low: 1,
  medium: 1.5,
  high: 2
};

// Task patterns for different financial categories
const TASK_PATTERNS = {
  savings: [
    { title: 'Research savings options', difficulty: 'easy' },
    { title: 'Set up savings account', difficulty: 'medium' },
    { title: 'Create automatic transfer schedule', difficulty: 'medium' },
    { title: 'Monitor progress', difficulty: 'easy' }
  ],
  investment: [
    { title: 'Research investment options', difficulty: 'hard' },
    { title: 'Risk assessment', difficulty: 'medium' },
    { title: 'Create investment plan', difficulty: 'hard' },
    { title: 'Execute initial investment', difficulty: 'medium' },
    { title: 'Set up tracking system', difficulty: 'easy' }
  ],
  budgeting: [
    { title: 'Track current expenses', difficulty: 'medium' },
    { title: 'Categorize spending', difficulty: 'easy' },
    { title: 'Set category limits', difficulty: 'medium' },
    { title: 'Create budget plan', difficulty: 'hard' }
  ],
  debt: [
    { title: 'List all debts', difficulty: 'easy' },
    { title: 'Calculate interest rates', difficulty: 'medium' },
    { title: 'Create repayment strategy', difficulty: 'hard' },
    { title: 'Set up payment reminders', difficulty: 'easy' }
  ]
};

// Calculate XP for a single microtask
const calculateMicroTaskXP = (
  difficulty: 'easy' | 'medium' | 'hard',
  categoryBaseXP: number,
  priorityMultiplier: number
): number => {
  const baseXP = categoryBaseXP / 4; // Divide base XP among average number of microtasks
  const difficultyMultiplier = DIFFICULTY_WEIGHTS[difficulty];
  return Math.round(baseXP * difficultyMultiplier * priorityMultiplier);
};

// Generate microtasks based on task category and customize titles
export const generateMicroTasks = (task: Omit<Task, 'id' | 'microTasks' | 'totalXP'>): MicroTask[] => {
  const pattern = TASK_PATTERNS[task.category as keyof typeof TASK_PATTERNS] || TASK_PATTERNS.budgeting;
  const baseXP = CATEGORY_BASE_XP[task.category as keyof typeof CATEGORY_BASE_XP] || 100;
  const priorityMultiplier = PRIORITY_MULTIPLIERS[task.priority];

  return pattern.map((template, index) => ({
    id: `${Date.now()}-${index}`,
    title: template.title.replace('current', task.title),
    difficulty: template.difficulty as 'easy' | 'medium' | 'hard',
    xp: calculateMicroTaskXP(template.difficulty as 'easy' | 'medium' | 'hard', baseXP, priorityMultiplier),
    completed: false
  }));
};

// Create a complete task with microtasks
export const createTask = (taskData: Omit<Task, 'id' | 'microTasks' | 'totalXP'>): Task => {
  const microTasks = generateMicroTasks(taskData);
  const totalXP = microTasks.reduce((sum, task) => sum + task.xp, 0);

  return {
    id: Date.now().toString(),
    ...taskData,
    microTasks,
    totalXP
  };
};