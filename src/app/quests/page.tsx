'use client';

import { motion } from 'framer-motion';

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  requirements: string[];
  completionCriteria: string;
  timeLimit?: string;
}

export default function Quests() {
  const quests: Quest[] = [
    {
      id: 'q1',
      title: 'Budget Master',
      description: 'Create and maintain a detailed budget for 30 days',
      difficulty: 'medium',
      xpReward: 500,
      coinReward: 100,
      requirements: ['Level 3+', 'Complete Basic Finance Tutorial'],
      completionCriteria: 'Log expenses daily for 30 consecutive days',
      timeLimit: '30 days'
    },
    {
      id: 'q2',
      title: 'Savings Champion',
      description: 'Save 20% of monthly income for 3 months',
      difficulty: 'hard',
      xpReward: 1000,
      coinReward: 250,
      requirements: ['Level 5+', 'Complete Budget Master Quest'],
      completionCriteria: 'Provide proof of savings through bank statements',
      timeLimit: '90 days'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Financial Quests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{quest.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm ${
                quest.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                quest.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {quest.difficulty}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{quest.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center">
                <span className="text-purple-500 mr-2">🏆</span>
                <span>{quest.xpReward} XP</span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">💰</span>
                <span>{quest.coinReward} Coins</span>
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-2">Requirements:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {quest.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Accept Quest
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}