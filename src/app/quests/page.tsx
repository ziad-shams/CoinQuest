'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultQuests, createCustomQuest, type Quest } from '@/data/quests';

const QuestPage = () => {
  const [quests, setQuests] = useState<Quest[]>(defaultQuests);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newQuest, setNewQuest] = useState({
    title: '',
    description: '',
    difficulty: 'medium' as Quest['difficulty'],
    customGoal: undefined as number | undefined,
    timeLimit: undefined as number | undefined
  });

  const handleCreateQuest = () => {
    if (!newQuest.title || !newQuest.description) return;

    const quest = createCustomQuest(newQuest);
    setQuests([...quests, quest]);
    setShowCreateModal(false);
    setNewQuest({
      title: '',
      description: '',
      difficulty: 'medium',
      customGoal: undefined,
      timeLimit: undefined
    });
  };

  const handleQuestAction = (questId: string, action: 'start' | 'complete' | 'abandon') => {
    setQuests(quests.map(quest => {
      if (quest.id === questId) {
        switch (action) {
          case 'start':
            return { ...quest, status: 'in_progress' };
          case 'complete':
            return { ...quest, status: 'completed', progress: 100 };
          case 'abandon':
            return { ...quest, status: 'failed' };
          default:
            return quest;
        }
      }
      return quest;
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Financial Quests</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Custom Quest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {quests.map((quest) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{quest.title}</h3>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    quest.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    quest.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {quest.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{quest.description}</p>

                <div className="space-y-2 mb-4">
                  {quest.requirements && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <strong>Requirements:</strong>
                      <ul className="list-disc list-inside ml-2">
                        {quest.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {quest.timeLimit && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <strong>Time Limit:</strong> {quest.timeLimit} days
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-purple-600 dark:text-purple-400">
                      {quest.xpReward} XP
                    </span>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      {quest.coinReward} 🪙
                    </span>
                  </div>
                </div>

                {quest.status === 'available' && (
                  <button
                    onClick={() => handleQuestAction(quest.id, 'start')}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Start Quest
                  </button>
                )}

                {quest.status === 'in_progress' && (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${quest.progress}%` }}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleQuestAction(quest.id, 'complete')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleQuestAction(quest.id, 'abandon')}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Abandon
                      </button>
                    </div>
                  </div>
                )}

                {(quest.status === 'completed' || quest.status === 'failed') && (
                  <div className={`text-center py-2 rounded-lg ${
                    quest.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {quest.status === 'completed' ? 'Completed' : 'Failed'}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Create Quest Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Create Custom Quest</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newQuest.title}
                  onChange={(e) => setNewQuest({ ...newQuest, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newQuest.description}
                  onChange={(e) => setNewQuest({ ...newQuest, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty
                </label>
                <select
                  value={newQuest.difficulty}
                  onChange={(e) => setNewQuest({ ...newQuest, difficulty: e.target.value as Quest['difficulty'] })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Custom Goal (optional)
                </label>
                <input
                  type="number"
                  value={newQuest.customGoal || ''}
                  onChange={(e) => setNewQuest({ ...newQuest, customGoal: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter target amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time Limit (days, optional)
                </label>
                <input
                  type="number"
                  value={newQuest.timeLimit || ''}
                  onChange={(e) => setNewQuest({ ...newQuest, timeLimit: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter number of days"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleCreateQuest}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Quest
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuestPage;