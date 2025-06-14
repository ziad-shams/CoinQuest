
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    xp: number;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    microTasks: Array<{
      id: string;
      title: string;
      completed: boolean;
      xp: number;
    }>;
    category: 'financial' | 'personal' | 'work' | 'health';
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { dispatch } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCompleteTask = () => {
    dispatch({ type: 'COMPLETE_TASK', taskId: task.id });
  };

  const handleCompleteMicroTask = (microTaskId: string) => {
    dispatch({ type: 'COMPLETE_MICROTASK', taskId: task.id, microTaskId });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'financial': return '💰';
      case 'personal': return '🏠';
      case 'work': return '💼';
      case 'health': return '🏥';
      default: return '📋';
    }
  };

  const completedMicroTasks = task.microTasks.filter(mt => mt.completed).length;
  const totalMicroTasks = task.microTasks.length;
  const progressPercentage = totalMicroTasks > 0 ? (completedMicroTasks / totalMicroTasks) * 100 : 0;

  return (
    <div className={`border-l-4 rounded-lg p-4 shadow-lg transition-all duration-300 hover:shadow-xl ${getPriorityColor(task.priority)} ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <span className="text-2xl">{getCategoryEmoji(task.category)}</span>
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {task.description}
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                +{task.xp} XP
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!task.completed && (
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-primary"
            >
              {isExpanded ? '▼' : '▶'}
            </Button>
          )}
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleCompleteTask}
            disabled={task.completed}
            className="w-6 h-6"
          />
        </div>
      </div>

      {/* Progress bar for micro tasks */}
      {totalMicroTasks > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{completedMicroTasks}/{totalMicroTasks} tasks</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Micro tasks */}
      {isExpanded && !task.completed && (
        <div className="mt-4 space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
          <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
            🎯 Micro Tasks
          </h4>
          {task.microTasks.map((microTask) => (
            <div
              key={microTask.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <Checkbox
                checked={microTask.completed}
                onCheckedChange={() => handleCompleteMicroTask(microTask.id)}
                disabled={microTask.completed}
                className="w-4 h-4"
              />
              <span className={`flex-1 text-sm ${microTask.completed ? 'line-through text-gray-500' : ''}`}>
                {microTask.title}
              </span>
              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                +{microTask.xp} XP
              </span>
            </div>
          ))}
        </div>
      )}

      {task.completed && (
        <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300 font-medium text-center">
            ✅ Task completed! Great job!
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
