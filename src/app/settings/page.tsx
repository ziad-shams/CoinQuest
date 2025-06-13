'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '@/store/useAppStore';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface ThemeSetting {
  id: string;
  name: string;
  value: 'light' | 'dark' | 'system';
  preview: string;
}

interface PetType {
  id: string;
  name: string;
  value: 'cat' | 'dog' | 'rabbit' | 'hamster';
  preview: string;
}

const petColors = [
  { id: 'c1', value: '#9C27B0', name: 'Purple' },
  { id: 'c2', value: '#2196F3', name: 'Blue' },
  { id: 'c3', value: '#4CAF50', name: 'Green' },
  { id: 'c4', value: '#FF9800', name: 'Orange' },
  { id: 'c5', value: '#E91E63', name: 'Pink' },
];

export default function Settings() {
  const { theme, pet, setTheme, setPet } = useAppStore();
  
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'n1',
      title: 'Quest Reminders',
      description: 'Get notified about quest deadlines and updates',
      enabled: true
    },
    {
      id: 'n2',
      title: 'Achievement Alerts',
      description: 'Receive notifications when you earn badges or rewards',
      enabled: true
    },
    {
      id: 'n3',
      title: 'Streak Notifications',
      description: 'Daily reminders to maintain your streak',
      enabled: false
    }
  ]);

  const themes: ThemeSetting[] = [
    { id: 't1', name: 'System', value: 'system', preview: '🖥️' },
    { id: 't2', name: 'Light', value: 'light', preview: '☀️' },
    { id: 't3', name: 'Dark', value: 'dark', preview: '🌙' }
  ];

  const petTypes: PetType[] = [
    { id: 'p1', name: 'Cat', value: 'cat', preview: '🐱' },
    { id: 'p2', name: 'Dog', value: 'dog', preview: '🐶' },
    { id: 'p3', name: 'Rabbit', value: 'rabbit', preview: '🐰' },
    { id: 'p4', name: 'Hamster', value: 'hamster', preview: '🐹' }
  ];

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

  useEffect(() => {
    // Initialize theme on component mount
    const updateTheme = () => {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const effectiveTheme = theme === 'system' ? systemTheme : theme;
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(effectiveTheme);
    };

    updateTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Settings</h1>

      <div className="space-y-8">
        {/* Account Section */}
        <motion.section
          className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-lg shadow-lg p-6 border border-purple-100 dark:border-purple-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Account</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                JD
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
              </div>
            </div>
            <button className="text-purple-500 hover:text-purple-600 text-sm font-semibold transition-colors">
              Edit Profile
            </button>
          </div>
        </motion.section>

        {/* Pet Customization Section */}
<motion.section
          className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg shadow-lg p-6 border border-blue-100 dark:border-blue-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Pet Customization</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Pet Type</h3>
              <div className="grid grid-cols-4 gap-4">
                {petTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPet({ type: type.value })}
                    className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 hover:shadow-lg ${
                      pet.type === type.value
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.preview}</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Pet Color</h3>
              <div className="grid grid-cols-5 gap-4">
                {petColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setPet({ color: color.value })}
                    className={`group relative p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
                      pet.color === color.value
                        ? 'border-purple-500'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: color.value }}
                    />
                    <div className="text-xs font-medium text-gray-800 dark:text-white">{color.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Pet Name</h3>
              <input
                type="text"
                value={pet.name}
                onChange={(e) => setPet({ name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 border-purple-200 dark:border-purple-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter pet name"
              />
            </div>
          </div>
        </motion.section>

        {/* Theme Section */}
        <motion.section
          className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-lg shadow-lg p-6 border border-green-100 dark:border-green-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Theme</h2>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.value)}
                className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 hover:shadow-lg ${
                  theme === themeOption.value
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">{themeOption.preview}</div>
                <div className="text-sm font-medium text-gray-800 dark:text-white">{themeOption.name}</div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Notifications Section */}
        <motion.section
          className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20 rounded-lg shadow-lg p-6 border border-orange-100 dark:border-orange-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Notifications</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-colors border border-gray-200 dark:border-gray-600"
              >
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{notification.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{notification.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(notification.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notification.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}