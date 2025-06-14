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
    await userRef.set({ user: defaultUserSchema });
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