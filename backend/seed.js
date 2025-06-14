const { db } = require('./firebase');

async function seed() {
  const userId = '1';
  const userRef = db.collection('users').doc(userId);

  // Create sample user
  const userObject = {
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

    await userRef.set(userObject); // this creates the document
}

seed().catch(console.error);