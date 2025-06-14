
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const AnimatedPet: React.FC = () => {
  const { state } = useAppContext();
  const { user } = state;
  const [isHappy, setIsHappy] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHappy(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getPetEmoji = () => {
    switch (user.selectedPet) {
      case 'cat': return isHappy ? '😸' : '😺';
      case 'plant': return isHappy ? '🌻' : '🌱';
      case 'dragon': return isHappy ? '🐲' : '🐉';
      default: return '😺';
    }
  };

  const getPetName = () => {
    switch (user.selectedPet) {
      case 'cat': return 'Whiskers';
      case 'plant': return 'Sprout';
      case 'dragon': return 'Spark';
      default: return 'Pet';
    }
  };

  const getHappinessLevel = () => {
    if (user.xp >= 200) return 'Ecstatic';
    if (user.xp >= 100) return 'Happy';
    if (user.xp >= 50) return 'Content';
    return 'Sleepy';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
      <h3 className="text-xl font-bold gradient-text mb-4">Your Companion</h3>
      
      <div className="relative inline-block">
        <div className={`text-8xl transition-transform duration-500 ${isHappy ? 'float-animation' : ''}`}>
          {getPetEmoji()}
        </div>
        
        {/* Happiness particles */}
        {isHappy && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                  animationDelay: `${i * 200}ms`
                }}
              >
                ✨
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h4 className="font-bold text-lg">{getPetName()}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Mood: {getHappinessLevel()}
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
          <p className="text-sm font-medium mb-1">Pet Care Tips:</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Complete tasks to keep {getPetName()} happy! 
            {user.xp < 50 && " Your pet needs attention - complete some tasks!"}
            {user.xp >= 50 && user.xp < 100 && " Your pet is getting happier!"}
            {user.xp >= 100 && " Your pet loves you! Keep up the great work!"}
          </p>
        </div>
      </div>
      
      {/* Accessories */}
      {user.petAccessories.length > 0 && (
        <div className="mt-4">
          <h5 className="font-semibold text-sm mb-2">Accessories:</h5>
          <div className="flex justify-center space-x-2">
            {user.petAccessories.map((accessory, index) => (
              <span key={index} className="text-lg">{accessory}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedPet;
