const { db } = require('../firebase');
const { getLevelFromXP } = require('../utils/xpLogic');

exports.getTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    if (!userSnap.exists) return res.status(404).json({ message: 'User not found' });

    const userData = userSnap.data();
    const tasks = userData.tasks || [];

    res.status(200).json({
      tasks,
      message: 'Tasks retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.addTask = async (req, res) => {
  const { userId, task } = req.body;

  try {
    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    if (!userSnap.exists) return res.status(404).json({ message: 'User not found' });

    const userData = userSnap.data();
    const updatedTasks = [...userData.tasks, task];

    await userRef.update({
      'tasks': updatedTasks
    });

    res.status(200).json({
      message: 'Tasks added successfully',
      tasks: updatedTasks
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.completeTask = async (req, res) => {
  const { userId, taskId, taskXP } = req.body;

  try {
    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    if (!userSnap.exists) return res.status(404).json({ message: 'User not found' });

    const userData = userSnap.data();
    const today = new Date().toISOString().split('T')[0];
    const isNewDay = today !== userData.lastActiveDate;

    let totalXPGained = taskXP;
    const updatedTasks = userData.tasks.map(task => {
      if (task.id === taskId) {
        const updatedMicroTasks = task.microTasks?.map(micro => ({ ...micro, completed: true })) || [];
        const microXP = updatedMicroTasks.reduce((acc, micro) => acc + (micro.xp || 0), 0);
        totalXPGained += microXP;
        return { ...task, completed: true, microTasks: updatedMicroTasks };
      }
      return task;
    });

    const newXP = userData.user.xp + totalXPGained;
    const newLevel = getLevelFromXP(newXP);
    const newStreak = isNewDay ? userData.streak + 1 : userData.streak;

    await userRef.update({
      'user.xp': newXP,
      'user.level': newLevel,
      'user.streak': newStreak,
      'user.lastActiveDate': today,
      'tasks': updatedTasks
    });

    res.status(200).json({
      message: 'Task and micro-tasks completed',
      xpGained: totalXPGained,
      newXP,
      newLevel,
      newStreak
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeMicroTask = async (req, res) => {
  const { userId, taskId, microTaskId } = req.body;

  try {
    const userRef = db.collection('users').doc(userId);
    const userSnap = await userRef.get();
    if (!userSnap.exists) return res.status(404).json({ message: 'User not found' });

    const userData = userSnap.data();

    let microXP = 0;
    const updatedTasks = userData.tasks.map(task => {
      if (task.id === taskId) {
        const updatedMicroTasks = task.microTasks?.map(micro => {
          if (micro.id === microTaskId && !micro.completed) {
            microXP = micro.xp || 0;
            return { ...micro, completed: true };
          }
          return micro;
        }) || [];
        return { ...task, microTasks: updatedMicroTasks };
      }
      return task;
    });

    const newXP = userData.user.xp + microXP;
    const newLevel = getLevelFromXP(newXP);

    await userRef.update({
      'user.xp': newXP,
      'user.level': newLevel,
      'tasks': updatedTasks
    });

    res.status(200).json({
      message: 'Micro-task completed',
      xpGained: microXP,
      newXP,
      newLevel
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};