'use client';

import { motion } from 'framer-motion';

interface Transaction {
  id: string;
  type: 'earning' | 'spending';
  amount: number;
  description: string;
  date: string;
  category: string;
}

export default function Wallet() {
  const walletInfo = {
    balance: 2500,
    totalEarned: 5000,
    totalSpent: 2500,
    savingsGoal: 5000,
    savingsProgress: 2500
  };

  const transactions: Transaction[] = [
    {
      id: 't1',
      type: 'earning',
      amount: 500,
      description: 'Quest Completion: Budget Master',
      date: '2024-01-20',
      category: 'Quests'
    },
    {
      id: 't2',
      type: 'spending',
      amount: 1000,
      description: 'Amazon Gift Card Redemption',
      date: '2024-01-18',
      category: 'Rewards'
    },
    {
      id: 't3',
      type: 'earning',
      amount: 250,
      description: 'Daily Streak Bonus',
      date: '2024-01-15',
      category: 'Bonus'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wallet</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
          <p className="text-3xl font-bold text-blue-500">{walletInfo.balance} 🪙</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold mb-2">Total Earned</h2>
          <p className="text-3xl font-bold text-green-500">{walletInfo.totalEarned} 🪙</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-2">Total Spent</h2>
          <p className="text-3xl font-bold text-red-500">{walletInfo.totalSpent} 🪙</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-2">Savings Goal</h2>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  {Math.round((walletInfo.savingsProgress / walletInfo.savingsGoal) * 100)}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {walletInfo.savingsProgress}/{walletInfo.savingsGoal} 🪙
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${(walletInfo.savingsProgress / walletInfo.savingsGoal) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Transaction History</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              className="flex items-center justify-between p-4 border-b last:border-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-4">
                <span className={`text-2xl ${
                  transaction.type === 'earning' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'earning' ? '↗️' : '↙️'}
                </span>
                <div>
                  <p className="font-semibold">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${
                  transaction.type === 'earning' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'earning' ? '+' : '-'}{transaction.amount} 🪙
                </p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}