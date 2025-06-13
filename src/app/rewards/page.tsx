'use client';

import { motion } from 'framer-motion';
import VirtualPet from '@/components/VirtualPet';
import { useState } from 'react';
import badges from '@/data/badges.json';

interface PetAccessory {
  id: string;
  name: string;
  type: 'hat' | 'outfit' | 'background';
  cost: number;
  equipped: boolean;
  image: string;
}

export default function Rewards() {
  const [userCoins, setUserCoins] = useState(1500);
  const [petAccessories, setPetAccessories] = useState<PetAccessory[]>([
    {
      id: 'acc1',
      name: 'Party Hat',
      type: 'hat',
      cost: 100,
      equipped: false,
      image: '🎩'
    },
    {
      id: 'acc2',
      name: 'Superhero Cape',
      type: 'outfit',
      cost: 200,
      equipped: false,
      image: '🦸‍♂️'
    },
    {
      id: 'acc3',
      name: 'Beach Background',
      type: 'background',
      cost: 150,
      equipped: false,
      image: '🏖️'
    }
  ]);

  const handleAccessoryToggle = (accessoryId: string) => {
    setPetAccessories(prev =>
      prev.map(acc => ({
        ...acc,
        equipped: acc.id === accessoryId ? !acc.equipped : acc.equipped
      }))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Rewards</h1>
        <div className="bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-lg">
          <span className="text-yellow-800 dark:text-yellow-200 font-medium">
            🪙 {userCoins} Coins
          </span>
        </div>
      </div>

      {/* Virtual Pet Section */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Virtual Pet</h2>
        <VirtualPet
          level={5}
          happiness={80}
          accessories={petAccessories.map(acc => ({
            ...acc,
            svgPath: '', // Add required svgPath property
            color: '#000000', // Add required color property  
            position: { x: 0, y: 0, scale: 1 } // Add required position property with scale
          }))}
          onAccessoryToggle={handleAccessoryToggle}
        />
      </div>

      {/* Achievement Roadmap */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Achievement Roadmap</h2>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
          
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
            {badges.badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                className="relative bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{badge.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{badge.description}</p>
                <div className="mt-2 text-purple-600 dark:text-purple-400 font-medium">
                  {badge.xpRequired} XP
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm font-medium">
                  {badge.tier}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}