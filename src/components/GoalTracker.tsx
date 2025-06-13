import React from 'react';
import { motion } from 'framer-motion';

interface GoalTrackerProps {
  currentAmount: number;
  targetAmount: number;
  goalName: string;
  deadline?: string;
  onUpdateAmount: (amount: number) => void;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({
  currentAmount,
  targetAmount,
  goalName,
  deadline,
  onUpdateAmount,
}) => {
  const progress = (currentAmount / targetAmount) * 100;
  const formattedProgress = Math.min(progress, 100).toFixed(1);
  const remaining = targetAmount - currentAmount;

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {goalName}
        </h3>
        {deadline && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Due by {deadline}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Current: ${currentAmount.toFixed(2)}</span>
          <span>Target: ${targetAmount.toFixed(2)}</span>
        </div>

        <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${formattedProgress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-green-500">
            {formattedProgress}% Complete
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            ${remaining.toFixed(2)} to go
          </span>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Update Progress
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="0"
              step="0.01"
              value={currentAmount}
              onChange={(e) => onUpdateAmount(parseFloat(e.target.value) || 0)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter amount"
            />
            <button
              onClick={() => onUpdateAmount(currentAmount)}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {progress >= 100 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-md text-green-700 dark:text-green-100 text-sm"
        >
          🎉 Congratulations! You've reached your savings goal!
        </motion.div>
      )}
    </div>
  );
};

export default GoalTracker;