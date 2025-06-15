
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { useBackendSync } from '@/hooks/useBackendSync';

const Settings: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { user, savingsGoal } = state;
  const { updateUser, updateSavingsGoal, toggleDarkMode } = useBackendSync( state.user.id )

  const handleUserUpdate = async (updates: Partial<typeof user>) => {
    dispatch({ type: 'UPDATE_USER', user: updates });
    await updateUser(updates)
  };

  const handleSavingsGoalUpdate = async (updates: Partial<typeof savingsGoal>) => {
    dispatch({ type: 'UPDATE_SAVINGS_GOAL', goal: { ...savingsGoal, ...updates } });
    await updateSavingsGoal({ ...savingsGoal, ...updates })
  };

  const handleDarkModeToggle = async () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
    await toggleDarkMode(!state.user.darkMode)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">⚙️ Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your CoinQuest experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold gradient-text mb-4">👤 Profile</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  value={user.name}
                  onChange={(e) => handleUserUpdate({ name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
            </div>
          </div>

          {/* Pet Companion Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold gradient-text mb-4">🐾 Pet Companion</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="pet">Choose Your Companion</Label>
                <Select value={user.selectedPet} onValueChange={(value: 'cat' | 'plant' | 'dragon') => handleUserUpdate({ selectedPet: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat">😺 Cat - Playful and energetic</SelectItem>
                    <SelectItem value="plant">🌱 Plant - Calm and growing</SelectItem>
                    <SelectItem value="dragon">🐉 Dragon - Powerful and wise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">
                    {user.selectedPet === 'cat' ? '😺' : 
                     user.selectedPet === 'plant' ? '🌱' : '🐉'}
                  </div>
                  <div>
                    <h3 className="font-bold">
                      {user.selectedPet === 'cat' ? 'Whiskers' : 
                       user.selectedPet === 'plant' ? 'Sprout' : 'Spark'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.selectedPet === 'cat' ? 'Your playful feline friend who gets excited when you complete tasks!' : 
                       user.selectedPet === 'plant' ? 'Your growing plant companion that thrives on your productivity!' : 
                       'Your wise dragon companion that celebrates your achievements!'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold gradient-text mb-4">🎨 Appearance</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Toggle between light and dark themes
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={user.darkMode}
                  onCheckedChange={handleDarkModeToggle}
                />
              </div>
              
              <div>
                <Label htmlFor="fontSize">Font Size</Label>
                <Select value={user.fontSize} onValueChange={(value: 'normal' | 'large') => handleUserUpdate({ fontSize: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="large">Large (Accessibility)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold gradient-text mb-4">🔔 Notifications</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="reminderTime">Daily Reminder Time</Label>
                <Input
                  id="reminderTime"
                  type="time"
                  value={user.reminderTime}
                  onChange={(e) => handleUserUpdate({ reminderTime: e.target.value })}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Get reminded to check your daily quests
                </p>
              </div>
            </div>
          </div>

          {/* Savings Goal Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold gradient-text mb-4">💰 Savings Goal</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="goalTitle">Goal Title</Label>
                <Input
                  id="goalTitle"
                  value={savingsGoal.title}
                  onChange={(e) => handleSavingsGoalUpdate({ title: e.target.value })}
                  placeholder="e.g., Emergency Fund, New Car"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goalTarget">Target Amount ($)</Label>
                  <Input
                    id="goalTarget"
                    type="number"
                    value={savingsGoal.target}
                    onChange={(e) => handleSavingsGoalUpdate({ target: parseFloat(e.target.value) || 0 })}
                    placeholder="1000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="goalCurrent">Current Amount ($)</Label>
                  <Input
                    id="goalCurrent"
                    type="number"
                    value={savingsGoal.current}
                    onChange={(e) => handleSavingsGoalUpdate({ current: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold gradient-text mb-4">📊 Data Management</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  🔄 Data Sync
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                  Your data is automatically saved locally. Backend integration coming soon for cloud sync!
                </p>
                <Button variant="outline" className="text-yellow-700 border-yellow-300">
                  Export Data (Coming Soon)
                </Button>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  ⚠️ Reset Data
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  This will permanently delete all your progress, tasks, and settings.
                </p>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
                      localStorage.removeItem('coinquest-state');
                      window.location.reload();
                    }
                  }}
                >
                  Reset All Data
                </Button>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold gradient-text mb-4">ℹ️ About CoinQuest</h2>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Version 1.0.0</p>
              <p>Gamified Financial Task Manager for ADHD</p>
              <p>Built with React, TypeScript, and Tailwind CSS</p>
              <p className="text-xs mt-4">
                🚀 Backend integration and advanced features coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
