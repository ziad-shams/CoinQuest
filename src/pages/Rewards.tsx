
import React from 'react';
import { useAppContext } from '../context/AppContext';
import BadgeGrid from '../components/BadgeGrid';
import AnimatedPet from '../components/AnimatedPet';
import XPBar from '../components/XPBar';

const Rewards: React.FC = () => {
  const { state } = useAppContext();
  const { user } = state;

  const getMotivationalMessage = () => {
    if (user.xp >= 200) return "You're absolutely crushing it! 🔥";
    if (user.xp >= 100) return "Amazing progress! Keep it up! ⭐";
    if (user.xp >= 50) return "Great work! You're on the right track! 🌟";
    return "Every journey begins with a single step! 🚀";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">🏆 Rewards Center</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Celebrate your achievements and track your progress
          </p>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white text-center shadow-lg mb-8">
          <div className="text-2xl font-bold mb-2">
            {getMotivationalMessage()}
          </div>
          <div className="text-lg opacity-90">
            You've earned <span className="font-bold">{user.xp} XP</span> and reached <span className="font-bold">Level {user.level}</span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-8">
          <XPBar />
        </div>

        {/* Pet Companion */}
        <div className="mb-8">
          <AnimatedPet />
        </div>

        {/* Badge Achievement System */}
        <div className="mb-8">
          <BadgeGrid />
        </div>

        {/* Achievement Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-4xl mb-3">🎯</div>
            <div className="font-bold text-2xl gradient-text">{user.level}</div>
            <div className="text-gray-600 dark:text-gray-400">Current Level</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-4xl mb-3">💎</div>
            <div className="font-bold text-2xl gradient-text">{user.xp}</div>
            <div className="text-gray-600 dark:text-gray-400">Total XP Earned</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-4xl mb-3">🔥</div>
            <div className="font-bold text-2xl gradient-text">{user.streak}</div>
            <div className="text-gray-600 dark:text-gray-400">Day Streak</div>
          </div>
        </div>

        {/* Upcoming Rewards */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold gradient-text mb-4">🎁 Upcoming Rewards</h3>
          <div className="space-y-3">
            {user.level < 2 && (
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="font-semibold">Level 2 Achievement</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Unlock new pet accessories
                    </div>
                  </div>
                </div>
                <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                  {100 - user.xp} XP to go
                </div>
              </div>
            )}
            
            {user.streak < 7 && (
              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👑</span>
                  <div>
                    <div className="font-semibold">Consistency King Badge</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Maintain a 7-day streak
                    </div>
                  </div>
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                  {7 - user.streak} days to go
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <div className="font-semibold">Pet Customization</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Unlock new pet types and accessories
                  </div>
                </div>
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                Coming soon!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
