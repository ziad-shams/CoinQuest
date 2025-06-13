import React, { useState } from 'react';
import GoalTracker from '../components/GoalTracker';

interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  color: string;
  icon: string;
}

const Wallet: React.FC = () => {
  const [currentSavings, setCurrentSavings] = useState(2500);
  
  // Mock data - replace with actual data from your state management
  const savingsGoal = {
    name: 'Emergency Fund',
    targetAmount: 5000,
    deadline: '2024-06-30',
  };

  const expenseCategories: ExpenseCategory[] = [
    { id: '1', name: 'Housing', amount: 1200, color: 'bg-blue-500', icon: '🏠' },
    { id: '2', name: 'Food', amount: 400, color: 'bg-green-500', icon: '🍽️' },
    { id: '3', name: 'Transportation', amount: 300, color: 'bg-yellow-500', icon: '🚗' },
    { id: '4', name: 'Entertainment', amount: 200, color: 'bg-purple-500', icon: '🎮' },
    { id: '5', name: 'Utilities', amount: 150, color: 'bg-red-500', icon: '💡' },
  ];

  const totalExpenses = expenseCategories.reduce((sum, category) => sum + category.amount, 0);

  const handleUpdateSavings = (amount: number) => {
    setCurrentSavings(amount);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Financial Overview
      </h1>

      {/* Savings Goal Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Savings Goal
        </h2>
        <GoalTracker
          currentAmount={currentSavings}
          targetAmount={savingsGoal.targetAmount}
          goalName={savingsGoal.name}
          deadline={savingsGoal.deadline}
          onUpdateAmount={handleUpdateSavings}
        />
      </div>

      {/* Expense Categories Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Monthly Expenses
          </h2>
          <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Total: ${totalExpenses}
          </span>
        </div>

        <div className="space-y-4">
          {expenseCategories.map(category => {
            const percentage = (category.amount / totalExpenses) * 100;
            
            return (
              <div key={category.id} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    ${category.amount}
                  </span>
                </div>

                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="absolute right-0 -bottom-6 text-sm text-gray-500 dark:text-gray-400">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Quick Tips */}
        <div className="mt-12 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300 mb-2">
            💡 Quick Tip
          </h3>
          <p className="text-purple-600 dark:text-purple-400">
            Try the 50/30/20 rule: Allocate 50% of your income to needs, 30% to wants,
            and 20% to savings and debt repayment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;