import React from 'react';
import { motion } from 'framer-motion';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requiredXP: number;
}

interface BadgeGridProps {
  badges: Badge[];
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ badges }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <motion.div
          key={badge.id}
          className={`relative p-4 rounded-lg shadow-md ${badge.unlocked 
            ? 'bg-white dark:bg-gray-800' 
            : 'bg-gray-100 dark:bg-gray-700 opacity-60'}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full ${badge.unlocked 
                ? 'bg-purple-100 dark:bg-purple-900' 
                : 'bg-gray-200 dark:bg-gray-600'}`}
            >
              <span className="text-3xl">{badge.icon}</span>
            </div>

            <h3 className={`font-semibold ${badge.unlocked 
              ? 'text-gray-800 dark:text-gray-200' 
              : 'text-gray-600 dark:text-gray-400'}`}
            >
              {badge.name}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {badge.description}
            </p>

            <div className="text-xs">
              {badge.unlocked ? (
                <span className="text-green-500">
                  Unlocked {badge.unlockedAt}
                </span>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">
                  Requires {badge.requiredXP} XP
                </span>
              )}
            </div>

            {badge.unlocked && (
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BadgeGrid;