const express = require('express');
const {
  getUser,
  createUser,
  updateUser,
  updateStreak,
  updateSavingsGoal,
  addTransaction,
  toggleDarkMode,
  unlockBadge
} = require('../controllers/users');

const router = express.Router();

router.get('/:userId', getUser);               // Get user by ID
router.post('/', createUser);                 // Create user
router.patch('/:userId', updateUser);
router.patch('/:userId/savings', updateSavingsGoal);
router.post('/:userId/transactions', addTransaction);
router.patch('/:userId/streak', updateStreak);
router.patch('/:userId/darkMode', toggleDarkMode);
router.patch('/:userId/badges/:badgeId', unlockBadge);
module.exports = router;
