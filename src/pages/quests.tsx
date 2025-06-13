import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'in_progress' | 'completed';
  xpReward: number;
  category: 'savings' | 'budgeting' | 'investing' | 'debt';
  microTasks: {
    id: string;
    title: string;
    completed: boolean;
    xp: number;
  }[];
}

const Quests: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data - replace with actual data from your state management
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Set up Emergency Fund',
      description: 'Create and fund your emergency savings account',
      status: 'in_progress',
      category: 'savings',
      xpReward: 100,
      microTasks: [
        { id: '1-1', title: 'Research best savings accounts', completed: true, xp: 20 },
        { id: '1-2', title: 'Open new savings account', completed: true, xp: 30 },
        { id: '1-3', title: 'Set up automatic transfers', completed: false, xp: 50 },
      ],
    },
    {
      id: '2',
      title: 'Create Monthly Budget',
      description: 'Plan and track your monthly income and expenses',
      status: 'in_progress',
      category: 'budgeting',
      xpReward: 150,
      microTasks: [
        { id: '2-1', title: 'List all income sources', completed: true, xp: 30 },
        { id: '2-2', title: 'Categorize expenses', completed: false, xp: 40 },
        { id: '2-3', title: 'Set spending limits', completed: false, xp: 80 },
      ],
    },
    {
      id: '3',
      title: 'Start Retirement Planning',
      description: 'Begin your journey to retirement savings',
      status: 'in_progress',
      category: 'investing',
      xpReward: 200,
      microTasks: [
        { id: '3-1', title: 'Research retirement accounts', completed: false, xp: 50 },
        { id: '3-2', title: 'Calculate retirement needs', completed: false, xp: 75 },
        { id: '3-3', title: 'Open retirement account', completed: false, xp: 75 },
      ],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Quests', icon: '🎯' },
    { id: 'savings', label: 'Savings', icon: '💰' },
    { id: 'budgeting', label: 'Budgeting', icon: '📊' },
    { id: 'investing', label: 'Investing', icon: '📈' },
    { id: 'debt', label: 'Debt', icon: '💳' },
  ];

  const filteredTasks = selectedCategory === 'all'
    ? tasks
    : tasks.filter(task => task.category === selectedCategory);

  const handleStatusChange = (taskId: string, status: 'in_progress' | 'completed') => {
    // Implement status change logic
    console.log('Status changed:', taskId, status);
  };

  const handleMicroTaskComplete = (taskId: string, microTaskId: string) => {
    // Implement micro task completion logic
    console.log('Micro task completed:', taskId, microTaskId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Available Quests
        </h1>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {filteredTasks.length} quests available
        </span>
      </div>

      {/* Category filters */}
      <div className="flex overflow-x-auto space-x-4 pb-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap
              ${selectedCategory === category.id
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Tasks grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            {...task}
            onStatusChange={handleStatusChange}
            onMicroTaskComplete={handleMicroTaskComplete}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No quests available in this category yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Quests;