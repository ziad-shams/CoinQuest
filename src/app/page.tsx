'use client';

import { motion } from 'framer-motion';
import XPBar from '@/components/XPBar';
import StreakTracker from '@/components/StreakTracker';
import TaskCard from '@/components/TaskCard';
import GoalTracker from '@/components/GoalTracker';
import VirtualPet from '@/components/VirtualPet';
import useAppStore from '@/store/useAppStore';

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

export default function Home() {
  const { pet, goals } = useAppStore();

  const userStats = {
    currentXP: 750,
    maxXP: 1000,
    level: 5,
    currentStreak: 7,
    longestStreak: 14,
    lastCompletedDate: '2024-01-20',
    totalCoins: 2500,
    questsCompleted: 15,
    tasksCompleted: 42
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
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-2"
          >
            {userStats.totalCoins} 🪙
          </motion.div>
          <p className="text-purple-100">Total Coins Earned</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-2"
          >
            {userStats.questsCompleted} 🎯
          </motion.div>
          <p className="text-blue-100">Quests Completed</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold mb-2"
          >
            {userStats.tasksCompleted} ✅
          </motion.div>
          <p className="text-green-100">Tasks Completed</p>
        </div>
      </motion.div>

      {/* Progress Trackers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-xl shadow-lg p-6 border border-purple-100 dark:border-purple-900"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <XPBar
            currentXP={userStats.currentXP}
            maxXP={userStats.maxXP}
            level={userStats.level}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl shadow-lg p-6 border border-blue-100 dark:border-blue-900"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <StreakTracker
            currentStreak={userStats.currentStreak}
            longestStreak={userStats.longestStreak}
            lastCompletedDate={userStats.lastCompletedDate}
          />
        </motion.div>
      </div>

      {/* Pet and Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-xl shadow-lg overflow-hidden border border-green-100 dark:border-green-900"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Virtual Pet</h3>
            <VirtualPet
              level={userStats.level}
              happiness={85}
              accessories={[]}
              onAccessoryToggle={() => {}}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20 rounded-xl shadow-lg p-6 border border-orange-100 dark:border-orange-900"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GoalTracker goal={goals} onUpdateProgress={() => {}} />
        </motion.div>
      </div>

      {/* Active Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Active Tasks</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Add New Task
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
          {topTasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700"
            >
              No active tasks. Start a new quest or create a task!
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}