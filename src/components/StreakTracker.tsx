
import React from 'react';
import { useAppContext } from '../context/AppContext';

const StreakTracker: React.FC = () => {
  const { state } = useAppContext();
  const { user } = state;

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 14) return '🔥🔥';
    if (streak >= 7) return '🔥';
    if (streak >= 3) return '⚡';
    if (streak >= 1) return '✨';
    return '💫';
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-red-500';
    if (streak >= 14) return 'text-orange-500';
    if (streak >= 7) return 'text-yellow-500';
    if (streak >= 3) return 'text-blue-500';
    return 'text-purple-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{getStreakEmoji(user.streak)}</span>
          <div>
            <h3 className="font-bold text-lg">Streak</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keep it up!
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-3xl font-bold ${getStreakColor(user.streak)}`}>
            {user.streak}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">days</p>
        </div>
      </div>
      
      {user.streak > 0 && (
        <div className="mt-3 p-2 bg-primary/10 rounded-lg">
          <p className="text-sm text-primary font-medium text-center">
            🎉 Amazing consistency! You're on fire!
          </p>
        </div>
      )}
    </div>
  );
};

export default StreakTracker;
