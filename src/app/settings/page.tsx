'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface ThemeSetting {
  id: string;
  name: string;
  value: string;
  preview: string;
}

export default function Settings() {
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

  const [selectedTheme, setSelectedTheme] = useState('system');
  const themes: ThemeSetting[] = [
    { id: 't1', name: 'System', value: 'system', preview: '🖥️' },
    { id: 't2', name: 'Light', value: 'light', preview: '☀️' },
    { id: 't3', name: 'Dark', value: 'dark', preview: '🌙' }
  ];

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-8">
        {/* Account Section */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-6">Account</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                JD
              </div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-semibold">
              Edit Profile
            </button>
          </div>
        </motion.section>

        {/* Theme Section */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-6">Theme</h2>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedTheme === theme.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
                onClick={() => setSelectedTheme(theme.value)}
              >
                <div className="text-3xl mb-2">{theme.preview}</div>
                <div className="font-medium">{theme.name}</div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Notifications Section */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6">Notifications</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-gray-500">{notification.description}</p>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleNotification(notification.id)}
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

        {/* Privacy Section */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-6">Privacy</h2>
          <div className="space-y-4">
            <button className="w-full text-left py-2 hover:text-blue-500 transition-colors">
              Privacy Policy
            </button>
            <button className="w-full text-left py-2 hover:text-blue-500 transition-colors">
              Terms of Service
            </button>
            <button className="w-full text-left py-2 hover:text-blue-500 transition-colors">
              Data & Storage
            </button>
          </div>
        </motion.section>

        {/* Danger Zone */}
        <motion.section
          className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-2 border-red-200 dark:border-red-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
            Delete Account
          </button>
        </motion.section>
      </div>
    </div>
  );
}