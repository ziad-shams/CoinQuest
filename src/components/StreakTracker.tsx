import React from 'react';
import { motion } from 'framer-motion';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({
  currentStreak,
  longestStreak,
  lastCompletedDate
}) => {
  const flameColors = [
    'text-orange-300',
    'text-orange-400',
    'text-orange-500',
    'text-orange-600'
  ];

  const getFlameColor = (streak: number) => {
    if (streak < 3) return flameColors[0];
    if (streak < 7) return flameColors[1];
    if (streak < 14) return flameColors[2];
    return flameColors[3];
  };

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <motion.span
            className={`text-2xl ${getFlameColor(currentStreak)}`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🔥
          </motion.span>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Current Streak
          </h3>
        </div>
        <span className="text-2xl font-bold text-purple-500">
          {currentStreak} days
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex justify-between">
          <span>Longest Streak</span>
          <span className="font-medium">{longestStreak} days</span>
        </div>
        <div className="flex justify-between">
          <span>Last Completed</span>
          <span className="font-medium">{lastCompletedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default StreakTracker;