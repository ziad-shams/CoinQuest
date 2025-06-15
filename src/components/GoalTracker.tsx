
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useBackendSync } from '@/hooks/useBackendSync';

const GoalTracker: React.FC = () => {
  const { state } = useAppContext();
  const { savingsGoal } = state;
  const { updateSavingsGoal } = useBackendSync(state.user.id);
  
  const progressPercentage = (savingsGoal.current / savingsGoal.target) * 100;
  const remaining = savingsGoal.target - savingsGoal.current;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold gradient-text">💰 {savingsGoal.title}</h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          ${savingsGoal.current.toLocaleString()} / ${savingsGoal.target.toLocaleString()}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000 ease-out rounded-full relative"
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
          <p className="font-bold text-lg text-green-600 dark:text-green-400">
            {progressPercentage.toFixed(1)}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
          <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
            ${remaining.toLocaleString()}
          </p>
        </div>
      </div>
      
      {progressPercentage >= 100 && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <p className="text-green-700 dark:text-green-300 font-bold text-center">
            🎉 Congratulations! Goal achieved!
          </p>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;
