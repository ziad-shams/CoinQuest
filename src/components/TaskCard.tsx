'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MicroTask {
  id: string;
  title: string;
  completed: boolean;
  xp: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'in_progress' | 'completed';
  xpReward: number;
  microTasks: MicroTask[];
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedMicroTasks = task.microTasks.filter(mt => mt.completed).length;
  const progress = (completedMicroTasks / task.microTasks.length) * 100;

  return (
    <motion.div
      className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {task.title}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-purple-500">
              +{task.xpReward} XP
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${task.status === 'completed' 
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'}`}
            >
              {task.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {task.description}
        </p>

        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-sm text-purple-500 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none"
        >
          {isExpanded ? 'Hide Microtasks' : 'Show Microtasks'}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 space-y-2"
            >
              {task.microTasks.map(microTask => (
                <div
                  key={microTask.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={microTask.completed}
                      onChange={() => console.log('Micro task completed:', microTask.id)}
                      className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
                    />
                    <span className={`text-sm ${microTask.completed 
                      ? 'text-gray-400 line-through' 
                      : 'text-gray-700 dark:text-gray-200'}`}
                    >
                      {microTask.title}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{microTask.xp} XP
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TaskCard;