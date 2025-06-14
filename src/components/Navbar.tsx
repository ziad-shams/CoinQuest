
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CoinTwinkle from './CoinTwinkle';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [showTwinkle, setShowTwinkle] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/quests', label: 'Quests', icon: '🎯' },
    { path: '/rewards', label: 'Rewards', icon: '🏆' },
    { path: '/wallet', label: 'Wallet', icon: '💰' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  const handleNavClick = () => {
    setShowTwinkle(true);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 fixed bottom-0 left-0 right-0 z-40">
        <div className="flex justify-around items-center py-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                location.pathname === item.path
                  ? 'text-primary bg-primary/10 transform scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/5'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      <CoinTwinkle 
        trigger={showTwinkle} 
        onComplete={() => setShowTwinkle(false)} 
      />
    </>
  );
};

export default Navbar;
