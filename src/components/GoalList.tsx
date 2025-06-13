'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoalTracker from './GoalTracker';
import useAppStore, { Goal } from '@/store/useAppStore';

const GoalList: React.FC = () => {
  const { goals, updateGoalProgress } = useAppStore();

  const handleUpdateProgress = (goalId: string, progress: number) => {
    updateGoalProgress(goalId, progress);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Goals</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {goals.filter((g: Goal) => g.completed).length} / {goals.length} Completed
        </div>
      </div>

      <AnimatePresence>
        {goals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            No goals yet. Start a quest to create one!
          </motion.div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal: Goal) => (
              <GoalTracker
                key={goal.id}
                goal={goal}
                onUpdateProgress={handleUpdateProgress}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoalList;