
import React from 'react';
import { useAppContext } from '../context/AppContext';

const BadgeGrid: React.FC = () => {
  const { state } = useAppContext();
  const { badges, user } = state;

  const checkBadgeUnlock = (badge: any) => {
    switch (badge.category) {
      case 'xp':
        return user.xp >= badge.requiredXP;
      case 'streak':
        return user.streak >= (badge.id === '2' ? 3 : 7);
      case 'tasks':
        return user.xp >= badge.requiredXP; // Simplified for demo
      case 'financial':
        return user.xp >= 50; // Simplified for demo
      default:
        return false;
    }
  };

  const getBadgePosition = (index: number) => {
    const positions = [
      { x: 50, y: 10 },  // Top center
      { x: 20, y: 30 },  // Left
      { x: 80, y: 30 },  // Right
      { x: 10, y: 60 },  // Bottom left
      { x: 50, y: 70 },  // Bottom center
      { x: 90, y: 60 },  // Bottom right
    ];
    return positions[index] || { x: 50, y: 50 };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold gradient-text mb-6 text-center">Achievement Roadmap</h2>
      
      <div className="relative h-96 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg overflow-hidden">
        {/* Roadmap path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M50,10 Q20,25 20,40 Q20,55 50,55 Q80,55 80,70 Q80,85 50,85"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-gray-300 dark:text-gray-600"
            strokeDasharray="2,2"
          />
        </svg>

        {badges.map((badge, index) => {
          const position = getBadgePosition(index);
          const isUnlocked = badge.unlocked || checkBadgeUnlock(badge);
          
          return (
            <div
              key={badge.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                isUnlocked ? 'scale-110 z-10' : 'scale-100'
              }`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-300 shadow-lg pulse-glow'
                    : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                }`}
              >
                <span className={`text-2xl ${isUnlocked ? 'animate-bounce' : 'grayscale'}`}>
                  {badge.icon}
                </span>
              </div>
              
              {/* Badge tooltip */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap transition-opacity duration-300 ${
                isUnlocked ? 'opacity-100' : 'opacity-60'
              }`}>
                <div className="font-bold">{badge.title}</div>
                <div className="text-gray-300">{badge.description}</div>
                {badge.category === 'xp' && (
                  <div className="text-yellow-300">Required: {badge.requiredXP} XP</div>
                )}
              </div>
              
              {/* Connection lines */}
              {index < badges.length - 1 && (
                <div className="absolute top-8 left-8 w-8 h-0.5 bg-gray-300 dark:bg-gray-600 transform rotate-45 origin-left"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Unlock badges by completing tasks and earning XP!
        </p>
      </div>
    </div>
  );
};

export default BadgeGrid;
