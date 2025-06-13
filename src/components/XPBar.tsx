import React from 'react';
import { motion } from 'framer-motion';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
}

const XPBar: React.FC<XPBarProps> = ({ currentXP, maxXP, level }) => {
  const progress = (currentXP / maxXP) * 100;

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Level {level}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {currentXP} / {maxXP} XP
        </span>
      </div>
      
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Level up notification */}
      {progress >= 100 && (
        <div className="mt-2 text-sm text-green-500 font-medium animate-pulse">
          Level Up Available! 🎉
        </div>
      )}
    </div>
  );
};

export default XPBar;