
import React from 'react';
import { useAppContext } from '../context/AppContext';

const XPBar: React.FC = () => {
  const { state } = useAppContext();
  const { user } = state;
  
  const xpProgress = ((user.level - 1) * 100 + user.xp) % 100;
  const progressPercentage = (xpProgress / 100) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🏅</span>
          <div>
            <h3 className="font-bold text-lg gradient-text">Level {user.level}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.xp} / {user.level * 100} XP
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Next Level</p>
          <p className="font-bold text-primary">{user.xpToNextLevel} XP</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full gradient-bg transition-all duration-1000 ease-out rounded-full relative"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>Level {user.level}</span>
        <span>Level {user.level + 1}</span>
      </div>
    </div>
  );
};

export default XPBar;
