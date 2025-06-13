import XPBar from '@/components/XPBar';
import StreakTracker from '@/components/StreakTracker';
import TaskCard from '@/components/TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'in_progress' | 'completed';
  xpReward: number;
  microTasks: {
    id: string;
    title: string;
    completed: boolean;
    xp: number;
  }[];
}

export default function Home() {
  const userStats = {
    currentXP: 750,
    maxXP: 1000,
    level: 5,
    currentStreak: 7,
    longestStreak: 14,
    lastCompletedDate: '2024-01-20',
  };

  const topTasks: Task[] = [
    {
      id: '1',
      title: 'Set up Emergency Fund',
      description: 'Create and fund your emergency savings account',
      status: 'in_progress',
      xpReward: 100,
      microTasks: [
        { id: '1-1', title: 'Research best savings accounts', completed: true, xp: 20 },
        { id: '1-2', title: 'Open new savings account', completed: true, xp: 30 },
        { id: '1-3', title: 'Set up automatic transfers', completed: false, xp: 50 },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <XPBar
            currentXP={userStats.currentXP}
            maxXP={userStats.maxXP}
            level={userStats.level}
          />
        </div>
        <div className="card">
          <StreakTracker
            currentStreak={userStats.currentStreak}
            longestStreak={userStats.longestStreak}
            lastCompletedDate={userStats.lastCompletedDate}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}