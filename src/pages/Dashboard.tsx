
import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import XPBar from '../components/XPBar';
import StreakTracker from '../components/StreakTracker';
import TaskCard from '../components/TaskCard';
import { useBackendSync } from '../hooks/useBackendSync';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { user, tasks } = state;
  const { updateStreak } = useBackendSync(state.user.id);

  useEffect(() => {
    // Update streak on dashboard visit
    dispatch({ type: 'UPDATE_STREAK' });
    async () => {
      await updateStreak(state.user.streak, state.user.lastActiveDate);
    }
  }, [dispatch]);

  const todayTasks = tasks
    .filter(task => !task.completed && task.dueDate === new Date().toISOString().split('T')[0])
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    })
    .slice(0, 3);

  const completedToday = tasks.filter(task => 
    task.completed && task.dueDate === new Date().toISOString().split('T')[0]
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ready to conquer your financial goals today?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <XPBar />
          <StreakTracker />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-bold text-xl gradient-text">{user.level}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Level</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-bold text-xl gradient-text">{completedToday}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Done Today</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-bold text-xl gradient-text">{todayTasks.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
          </div>
        </div>

        {/* Today's Priority Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            🌟 Today's Top Priorities
          </h2>
          
          {todayTasks.length > 0 ? (
            <div className="space-y-4">
              {todayTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold gradient-text mb-2">
                All caught up!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No urgent tasks for today. Great job staying on top of things!
              </p>
            </div>
          )}
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white text-center shadow-lg">
          <div className="text-lg font-medium mb-2">
            "The secret to getting ahead is getting started."
          </div>
          <div className="text-sm opacity-90">— Mark Twain</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
