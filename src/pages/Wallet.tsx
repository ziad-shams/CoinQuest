
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import GoalTracker from '../components/GoalTracker';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useBackendSync } from '@/hooks/useBackendSync';

const Wallet: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { transactions, cashBalance, creditBalance, savingsGoal } = state;
  const { addTransaction } = useBackendSync(state.user.id);
  
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    method: 'cash' as 'cash' | 'credit',
    category: 'food'
  });

  const handleAddTransaction = async () => {
    if (!newTransaction.name.trim() || !newTransaction.amount) return;

    const transaction = {
      id: Date.now().toString(),
      name: newTransaction.name,
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      type: newTransaction.type,
      method: newTransaction.method,
      category: newTransaction.category,
      date: new Date().toISOString()
    };

    dispatch({ type: 'ADD_TRANSACTION', transaction });
    await addTransaction(transaction)

    setNewTransaction({
      name: '',
      description: '',
      amount: '',
      type: 'expense',
      method: 'cash',
      category: 'food'
    });
    setIsAddingTransaction(false);
  };

  const totalBalance = cashBalance + creditBalance;
  const recentTransactions = transactions.slice(-5).reverse();

  const getTransactionIcon = (type: string, category: string) => {
    if (type === 'income') return '💰';
    switch (category) {
      case 'food': return '🍽️';
      case 'transport': return '🚗';
      case 'entertainment': return '🎬';
      case 'utilities': return '💡';
      case 'shopping': return '🛒';
      default: return '💳';
    }
  };

  const getCategoryExpenses = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categories: Record<string, number> = {};
    
    expenses.forEach(transaction => {
      categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
    });
    
    return Object.entries(categories).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / expenses.reduce((sum, t) => sum + t.amount, 0)) * 100
    }));
  };

  const categoryExpenses = getCategoryExpenses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">💰 Financial Wallet</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your expenses and savings goals
            </p>
          </div>
          
          <Dialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction}>
            <DialogTrigger asChild>
              <Button className="gradient-bg hover:opacity-90 text-white font-semibold">
                ➕ Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Transaction Name</label>
                  <Input
                    value={newTransaction.name}
                    onChange={(e) => setNewTransaction({...newTransaction, name: e.target.value})}
                    placeholder="e.g., Groceries, Salary, Coffee"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    placeholder="Additional details..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <Select value={newTransaction.type} onValueChange={(value: 'income' | 'expense') => setNewTransaction({...newTransaction, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">💰 Income</SelectItem>
                        <SelectItem value="expense">💸 Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <Select value={newTransaction.method} onValueChange={(value: 'cash' | 'credit') => setNewTransaction({...newTransaction, method: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">💵 Cash</SelectItem>
                        <SelectItem value="credit">💳 Credit/Debit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount ($)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">🍽️ Food</SelectItem>
                        <SelectItem value="transport">🚗 Transport</SelectItem>
                        <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
                        <SelectItem value="utilities">💡 Utilities</SelectItem>
                        <SelectItem value="shopping">🛒 Shopping</SelectItem>
                        <SelectItem value="other">📦 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleAddTransaction} className="flex-1 gradient-bg text-white">
                    Add Transaction
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingTransaction(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Balance Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-3">💰</div>
            <div className="font-bold text-2xl gradient-text">${totalBalance.toFixed(2)}</div>
            <div className="text-gray-600 dark:text-gray-400">Total Balance</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-3">💵</div>
            <div className="font-bold text-2xl text-green-600">${cashBalance.toFixed(2)}</div>
            <div className="text-gray-600 dark:text-gray-400">Cash</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-3">💳</div>
            <div className="font-bold text-2xl text-blue-600">${creditBalance.toFixed(2)}</div>
            <div className="text-gray-600 dark:text-gray-400">Credit/Debit</div>
          </div>
        </div>

        {/* Savings Goal */}
        <div className="mb-8">
          <GoalTracker />
        </div>

        {/* Expense Breakdown */}
        {categoryExpenses.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
            <h3 className="text-xl font-bold gradient-text mb-4">📊 Expense Breakdown</h3>
            <div className="space-y-3">
              {categoryExpenses.map(({ category, amount, percentage }) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTransactionIcon('expense', category)}</span>
                    <span className="font-medium capitalize">{category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${amount.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold gradient-text mb-4">📝 Recent Transactions</h3>
          
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {getTransactionIcon(transaction.type, transaction.category)}
                    </span>
                    <div>
                      <div className="font-semibold">{transaction.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {transaction.method === 'cash' ? '💵' : '💳'} {transaction.method} • {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold text-lg ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💸</div>
              <h4 className="text-lg font-semibold gradient-text mb-2">No transactions yet</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start tracking your finances by adding your first transaction!
              </p>
              <Button 
                onClick={() => setIsAddingTransaction(true)}
                className="gradient-bg text-white"
              >
                Add Your First Transaction
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
