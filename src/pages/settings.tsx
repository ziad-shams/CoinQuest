import React, { useState } from 'react';

interface Settings {
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  reminderTime: string;
  notifications: boolean;
  soundEffects: boolean;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    darkMode: false,
    fontSize: 'medium',
    reminderTime: '09:00',
    notifications: true,
    soundEffects: true,
  });

  const handleSettingChange = (key: keyof Settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // Here you would typically save to your state management or backend
    console.log('Settings updated:', { [key]: value });
  };

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Settings
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {/* Display Settings */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Display
          </h2>
          
          <div className="space-y-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-gray-700 dark:text-gray-300 font-medium">
                  Dark Mode
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark theme
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full
                  ${settings.darkMode ? 'bg-purple-500' : 'bg-gray-200'}`}
              >
                <span className="sr-only">Toggle dark mode</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                    ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>

            {/* Font Size Selector */}
            <div>
              <label className="text-gray-700 dark:text-gray-300 font-medium">
                Font Size
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Adjust the text size throughout the app
              </p>
              <div className="flex space-x-4">
                {fontSizeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleSettingChange('fontSize', option.value)}
                    className={`px-4 py-2 rounded-md ${settings.fontSize === option.value
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Notifications
          </h2>
          
          <div className="space-y-6">
            {/* Daily Reminder Time */}
            <div>
              <label className="text-gray-700 dark:text-gray-300 font-medium">
                Daily Reminder Time
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Set your preferred daily reminder time
              </p>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => handleSettingChange('reminderTime', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Push Notifications Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-gray-700 dark:text-gray-300 font-medium">
                  Push Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications for tasks and achievements
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('notifications', !settings.notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full
                  ${settings.notifications ? 'bg-purple-500' : 'bg-gray-200'}`}
              >
                <span className="sr-only">Toggle notifications</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                    ${settings.notifications ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>

            {/* Sound Effects Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-gray-700 dark:text-gray-300 font-medium">
                  Sound Effects
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Play sounds for achievements and completions
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('soundEffects', !settings.soundEffects)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full
                  ${settings.soundEffects ? 'bg-purple-500' : 'bg-gray-200'}`}
              >
                <span className="sr-only">Toggle sound effects</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                    ${settings.soundEffects ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            About CoinQuest
          </h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>Version 1.0.0</p>
            <p>Made with 💜 for ADHD minds</p>
            <a
              href="#"
              className="text-purple-500 hover:text-purple-600 dark:hover:text-purple-400"
            >
              Terms of Service
            </a>
            <span className="mx-2">•</span>
            <a
              href="#"
              className="text-purple-500 hover:text-purple-600 dark:hover:text-purple-400"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;