import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TaskCard from '../components/TaskCard';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import axios from 'axios';

const Quests: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { tasks } = state;

  const [filter, setFilter] = useState<'all' | 'inProgress' | 'completed'>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: 'financial' as 'financial' | 'personal' | 'work' | 'health',
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/1');
        const userData = response.data;
        if (userData && userData.tasks) {
          dispatch({ type: 'SET_TASKS', tasks: userData.tasks });
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'inProgress': return !task.completed;
      case 'completed': return task.completed;
      default: return true;
    }
  });

  const generateMicroTasks = (title: string, category: string) => {
    const commonMicroTasks: Record<string, string[]> = {
      financial: [
        'Research and gather information',
        'Review current financial status',
        'Create a plan or budget',
        'Execute the main action',
        'Document and track progress'
      ],
      personal: [
        'Set clear objectives',
        'Prepare necessary materials',
        'Complete main task',
        'Review and reflect'
      ],
      work: [
        'Plan and organize',
        'Execute main deliverables',
        'Review and quality check',
        'Submit or present'
      ],
      health: [
        'Assess current situation',
        'Research best practices',
        'Take action',
        'Monitor progress'
      ]
    };

    const templates = commonMicroTasks[category] || commonMicroTasks.personal;
    return templates.map((template, index) => ({
      id: `${Date.now()}-${index}`,
      title: template,
      completed: false,
      xp: Math.floor(Math.random() * 15) + 5
    }));
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const microTasks = generateMicroTasks(newTask.title, newTask.category);
    const totalMicroXP = microTasks.reduce((sum, mt) => sum + mt.xp, 0);

    const task = {
      id: Date.now().toString(),
      ...newTask,
      xp: totalMicroXP + 20,
      completed: false,
      microTasks
    };

    dispatch({ type: 'ADD_TASK', task });
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'financial',
      dueDate: new Date().toISOString().split('T')[0]
    });
    setIsAddingTask(false);
  };

  const getFilterStats = () => {
    const inProgress = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    return { inProgress, completed, total: tasks.length };
  };

  const stats = getFilterStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">🎯 Your Quests</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Break down your goals into achievable tasks
            </p>
          </div>
          
          <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
            <DialogTrigger asChild>
              <Button className="gradient-bg hover:opacity-90 text-white font-semibold">
                ➕ Add Quest
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Quest</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quest Title</label>
                  <Input
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="e.g., Set up emergency fund"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Describe your quest in detail..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <Select value={newTask.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask({...newTask, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">🟢 Low</SelectItem>
                        <SelectItem value="medium">🟡 Medium</SelectItem>
                        <SelectItem value="high">🔴 High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={newTask.category} onValueChange={(value: 'financial' | 'personal' | 'work' | 'health') => setNewTask({...newTask, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">💰 Financial</SelectItem>
                        <SelectItem value="personal">🏠 Personal</SelectItem>
                        <SelectItem value="work">💼 Work</SelectItem>
                        <SelectItem value="health">🏥 Health</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    ✨ Our AI will automatically break down your quest into smaller, manageable micro-tasks with appropriate XP rewards!
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleAddTask} className="flex-1 gradient-bg text-white">
                    Create Quest
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingTask(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-bold text-xl gradient-text">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Quests</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-bold text-xl text-orange-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-bold text-xl text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'gradient-bg text-white' : ''}
          >
            All Tasks
          </Button>
          <Button
            variant={filter === 'inProgress' ? 'default' : 'outline'}
            onClick={() => setFilter('inProgress')}
            className={filter === 'inProgress' ? 'gradient-bg text-white' : ''}
          >
            In Progress ({stats.inProgress})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'gradient-bg text-white' : ''}
          >
            Completed ({stats.completed})
          </Button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold gradient-text mb-2">
                {filter === 'completed' ? 'No completed quests yet' : 
                 filter === 'inProgress' ? 'No active quests' : 
                 'No quests created yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {filter === 'completed' ? 'Complete some tasks to see them here!' :
                 filter === 'inProgress' ? 'All your quests are completed!' :
                 'Start your journey by creating your first quest!'}
              </p>
              {filter === 'all' && (
                <Button 
                  onClick={() => setIsAddingTask(true)}
                  className="gradient-bg text-white"
                >
                  Create Your First Quest
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quests;
