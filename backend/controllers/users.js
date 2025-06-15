const { db } = require('../firebase');
const defaultUserSchema = require('../templates/defaultUserSchema');

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ id: userDoc.id, ...userDoc.data().user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const userRef = db.collection('users').doc(userId);
    const userData = {...defaultUserSchema, user: { ...defaultUserSchema.user, id: userId } }
    await userRef.set(userData);
    res.status(201).json({ message: 'User created successfully', userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.update({ user: updates });
    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTransaction = async (req, res) => {
  const { userId } = req.params;
  const { id, name, description, amount, type, method, category, date } = req.body;
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return res.status(404).json({ message: 'User not found' });
    const userData = userDoc.data();
    const newTransaction = {
      id,
      name,
      description,
      amount,
      type,
      method,
      category,
      date
    };
    const oldBalance = method == 'credit' ? userData.creditBalance : userData.cashBalance;
    const newBalance = oldBalance
    if(type=='income')
      newBalance += amount;
    else
      newBalance -= amount;
    await userRef.update({
      'cashBalance': method == 'cash' ? newBalance : userData.cashBalance,
      'creditBalance': method == 'credit' ? newBalance : userData.creditBalance,
      'transactions': [...userData.user.transactions, newTransaction],
    });
    res.status(200).json({ message: 'Transaction added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSavingsGoal = async (req, res) => {
  const { userId } = req.params;
  const { goal } = req.body;
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return res.status(404).json({ message: 'User not found' });
    const userData = userDoc.data();
    await userRef.update({
      'savingsGoal': goal
    });
    res.status(200).json({ message: 'Savings goal updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStreak = async (req, res) => {
  const { userId } = req.params;
  const { streak, lastActiveDate } = req.body;
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return res.status(404).json({ message: 'User not found' });
    const userData = userDoc.data();
    await userRef.update({
      'user.streak': streak,
      'user.lastActiveDate': lastActiveDate
    });
    res.status(200).json({ message: 'Streak updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleDarkMode = async (req, res) => {
  const { userId } = req.params;
  const { darkMode } = req.body;
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return res.status(404).json({ message: 'User not found' });
    const userData = userDoc.data();
    await userRef.update({
      'user.darkMode': darkMode
    });
    res.status(200).json({ message: 'Dark mode updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unlockBadge = async (req, res) => {
  const { userId, badgeId } = req.params;
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return res.status(404).json({ message: 'User not found' });
    const userData = userDoc.data();
    const badges = userData.badges;
    if(badges[badgeId].unlocked) return res.status(400).json({ message: 'Badge already unlocked' });
    badges[badgeId].unlocked = true;
    await userRef.update({
      'badges': badges
    });
    res.status(200).json({ message: 'Badge unlocked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




  