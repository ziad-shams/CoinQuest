import React from 'react';
import XPBar from '../components/XPBar';
import BadgeGrid from '../components/BadgeGrid';

const Rewards: React.FC = () => {
  // Mock data - replace with actual data from your state management
  const userStats = {
    currentXP: 750,
    maxXP: 1000,
    level: 5,
  };

  const badges = [
    {
      id: '1',
      name: 'Savings Starter',
      description: 'Started your first savings goal',
      icon: '🌱',
      unlocked: true,
      unlockedAt: '2024-01-15',
      requiredXP: 100,
    },
    {
      id: '2',
      name: 'Budget Master',
      description: 'Created and followed a budget for 30 days',
      icon: '📊',
      unlocked: true,
      unlockedAt: '2024-01-18',
      requiredXP: 300,
    },
    {
      id: '3',
      name: 'Investment Guru',
      description: 'Made your first investment',
      icon: '📈',
      unlocked: false,
      requiredXP: 500,
    },
    {
      id: '4',
      name: 'Debt Destroyer',
      description: 'Paid off a debt completely',
      icon: '💪',
      unlocked: false,
      requiredXP: 800,
    },
    {
      id: '5',
      name: 'Streak Champion',
      description: 'Maintained a 30-day task streak',
      icon: '🔥',
      unlocked: false,
      requiredXP: 1000,
    },
    {
      id: '6',
      name: 'Goal Getter',
      description: 'Achieved 5 savings goals',
      icon: '🎯',
      unlocked: false,
      requiredXP: 1500,
    },
  ];

  const unlockedBadges = badges.filter(badge => badge.unlocked).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Your Achievements
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Keep completing quests to unlock more badges and level up!
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Current Level
        </h2>
        <XPBar
          currentXP={userStats.currentXP}
          maxXP={userStats.maxXP}
          level={userStats.level}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Badges Collection
          </h2>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {unlockedBadges} / {badges.length} Unlocked
          </span>
        </div>

        <BadgeGrid badges={badges} />
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4">
          Coming Soon
        </h2>
        <p className="text-purple-600 dark:text-purple-400">
          More achievements and rewards are being crafted for your financial journey!
          Stay tuned for new challenges and exclusive badges.
        </p>
      </div>
    </div>
  );
};

export default Rewards;