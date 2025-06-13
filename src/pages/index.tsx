import React from 'react';
import XPBar from '@/components/XPBar';
import StreakTracker from '@/components/StreakTracker';
import TaskCard from '@/components/TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'in_progress' | 'completed';
  xpReward: number;
  microTasks: {
    id: string;
    title: string;
    completed: boolean;
    xp: number;
  }[];
}

const Dashboard: React.FC = () => {
  'use client';

  // Mock data - replace with actual data from your state management
  const userStats = {
    currentXP: 750,
    maxXP: 1000,
    level: 5,
    currentStreak: 7,
    longestStreak: 14,
    lastCompletedDate: '2024-01-20',
  };

  const topTasks: Task[] = [
    {
      id: '1',
      title: 'Set up Emergency Fund',
      description: 'Create and fund your emergency savings account',
      status: 'in_progress',
      xpReward: 100,
      microTasks: [
        { id: '1-1', title: 'Research best savings accounts', completed: true, xp: 20 },
        { id: '1-2', title: 'Open new savings account', completed: true, xp: 30 },
        { id: '1-3', title: 'Set up automatic transfers', completed: false, xp: 50 },
      ],
    },
    {
      id: '2',
      title: 'Track Monthly Expenses',
      description: 'Record and categorize all expenses for the month',
      status: 'in_progress',
      xpReward: 150,
      microTasks: [
        { id: '2-1', title: 'Collect all receipts', completed: true, xp: 30 },
        { id: '2-2', title: 'Categorize expenses', completed: false, xp: 40 },
        { id: '2-3', title: 'Review spending patterns', completed: false, xp: 80 },
      ],
    },
  ];

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
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Welcome back, Adventurer!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Level Progress
          </h2>
          <XPBar
            currentXP={userStats.currentXP}
            maxXP={userStats.maxXP}
            level={userStats.level}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Daily Streak
          </h2>
          <StreakTracker
            currentStreak={userStats.currentStreak}
            longestStreak={userStats.longestStreak}
            lastCompletedDate={userStats.lastCompletedDate}
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          Top Priority Quests
        </h2>
        <div className="space-y-4">
          {topTasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              onStatusChange={handleStatusChange}
              onMicroTaskComplete={handleMicroTaskComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;