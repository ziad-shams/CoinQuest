'use client';

import { motion } from 'framer-motion';

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: 'gift_card' | 'cash_back' | 'special_feature';
  image: string;
  available: boolean;
}

export default function Rewards() {
  const rewards: Reward[] = [
    {
      id: 'r1',
      title: '$10 Amazon Gift Card',
      description: 'Redeem your coins for an Amazon gift card',
      cost: 1000,
      category: 'gift_card',
      image: '🎁',
      available: true
    },
    {
      id: 'r2',
      title: '5% Cash Back Boost',
      description: 'Increase your cash back rate for 1 month',
      cost: 2000,
      category: 'cash_back',
      image: '💰',
      available: true
    },
    {
      id: 'r3',
      title: 'Custom Theme Pack',
      description: 'Unlock exclusive app themes and customizations',
      cost: 500,
      category: 'special_feature',
      image: '🎨',
      available: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Rewards Shop</h1>
        <div className="bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-lg">
          <span className="text-yellow-800 dark:text-yellow-100 font-semibold">Your Coins: 1,500 🪙</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <motion.div
            key={reward.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-4xl mb-2">{reward.image}</span>
                  <h2 className="text-xl font-semibold mt-2">{reward.title}</h2>
                </div>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm">
                  {reward.category.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{reward.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{reward.cost} 🪙</span>
                <button
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    reward.available
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!reward.available}
                >
                  {reward.available ? 'Redeem' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}