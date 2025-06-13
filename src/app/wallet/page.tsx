'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Transaction {
  id: string;
  type: 'cash' | 'credit';
  amount: number;
  description: string;
  date: string;
  name: string;
}

export default function Wallet() {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [walletInfo, setWalletInfo] = useState({
    cash: 1500,
    credit: 2000
  });

  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id' | 'date'>>({
    type: 'cash',
    amount: 0,
    description: '',
    name: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...newTransaction
    };

    setTransactions(prev => [transaction, ...prev]);
    setWalletInfo(prev => ({
      ...prev,
      [transaction.type]: prev[transaction.type] - transaction.amount
    }));

    setShowTransactionForm(false);
    setNewTransaction({
      type: 'cash',
      amount: 0,
      description: '',
      name: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Wallet</h1>
        <button
          onClick={() => setShowTransactionForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add Transaction
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-white text-lg font-medium mb-2">Cash Balance</h3>
          <p className="text-white text-3xl font-bold">${walletInfo.cash.toFixed(2)}</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-white text-lg font-medium mb-2">Credit Balance</h3>
          <p className="text-white text-3xl font-bold">${walletInfo.credit.toFixed(2)}</p>
        </motion.div>
      </div>

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Transaction Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newTransaction.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={newTransaction.amount || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={newTransaction.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="cash">Cash</option>
                  <option value="credit">Credit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newTransaction.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowTransactionForm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map(transaction => (
            <motion.div
              key={transaction.id}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">{transaction.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{transaction.description}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-red-600">-${transaction.amount.toFixed(2)}</p>
                <span className={`text-sm ${transaction.type === 'cash' ? 'text-blue-600' : 'text-purple-600'}`}>
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </span>
              </div>
            </motion.div>
          ))}

          {transactions.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No transactions yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}