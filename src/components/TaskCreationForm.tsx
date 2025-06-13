'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MicroTask {
  id: string;
  title: string;
  xp: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface TaskFormData {
  title: string;
  description: string;
  category: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
}

const calculateMicroTaskXP = (difficulty: 'easy' | 'medium' | 'hard', taskCount: number) => {
  const baseXP = {
    easy: 10,
    medium: 20,
    hard: 30
  }[difficulty];

  // Adjust XP based on total number of microtasks
  return Math.round(baseXP * (1 + (taskCount - 1) * 0.1));
};

const TaskCreationForm: React.FC = () => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    category: 'savings',
    deadline: '',
    priority: 'medium'
  });

  const [microTasks, setMicroTasks] = useState<MicroTask[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateMicroTasks = async () => {
    setIsGenerating(true);
    // Simulated AI task breakdown - In real implementation, this would call an AI service
    const mockMicroTasks: MicroTask[] = [
      {
        id: '1',
        title: `Research best options for ${formData.title}`,
        difficulty: 'easy',
        xp: 0
      },
      {
        id: '2',
        title: `Create plan for ${formData.title}`,
        difficulty: 'medium',
        xp: 0
      },
      {
        id: '3',
        title: `Execute first step of ${formData.title}`,
        difficulty: 'hard',
        xp: 0
      }
    ];

    // Calculate XP for each microtask
    const tasksWithXP = mockMicroTasks.map(task => ({
      ...task,
      xp: calculateMicroTaskXP(task.difficulty, mockMicroTasks.length)
    }));

    setMicroTasks(tasksWithXP);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Create New Task</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows={3}
            placeholder="Describe your task"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="savings">Savings</option>
              <option value="investment">Investment</option>
              <option value="budgeting">Budgeting</option>
              <option value="debt">Debt Management</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <button
          type="button"
          onClick={generateMicroTasks}
          disabled={!formData.title || isGenerating}
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg transition-colors"
        >
          {isGenerating ? 'Generating Tasks...' : 'Generate Micro-tasks'}
        </button>
      </form>

      <AnimatePresence>
        {microTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Generated Micro-tasks</h3>
            <div className="space-y-3">
              {microTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{task.title}</p>
                    <span className={`text-sm ${
                      task.difficulty === 'easy' ? 'text-green-500' :
                      task.difficulty === 'medium' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                    </span>
                  </div>
                  <div className="text-purple-600 font-semibold">
                    +{task.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskCreationForm;