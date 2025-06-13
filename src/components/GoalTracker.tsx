'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Goal } from '@/store/useAppStore';

interface GoalTrackerProps {
  goal: Goal;
  onUpdateProgress: (goalId: string, progress: number) => void;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ goal, onUpdateProgress }) => {
  const progress = (goal.progress / goal.target) * 100;
  const formattedProgress = Math.min(progress, 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`w-full rounded-lg shadow-md p-4 transition-colors ${
        goal.completed
          ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
          : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {goal.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>
        </div>
        {goal.completed && (
          <span className="text-green-500 dark:text-green-400 text-xl">✓</span>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Progress: {goal.progress}</span>
          <span>Target: {goal.target}</span>
        </div>

        <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-green-500">
            {formattedProgress}% Complete
          </span>
          {goal.deadline && (
            <span className="text-gray-600 dark:text-gray-300">
              Due by {new Date(goal.deadline).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Update Progress
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="0"
              max={goal.target}
              value={goal.progress}
              onChange={(e) => onUpdateProgress(goal.id, parseFloat(e.target.value) || 0)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter progress"
              disabled={goal.completed}
            />
          </div>
        </div>
      </div>

      {goal.completed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-md text-green-700 dark:text-green-100 text-sm"
        >
          🎉 Congratulations! You've reached your savings goal!
        </motion.div>
      )}
    </motion.div>
  );
};

export default GoalTracker;