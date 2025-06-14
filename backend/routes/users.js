const express = require('express');
const {
  getUser,
  createUser,
  updateUserProgress
} = require('../controllers/users');

const router = express.Router();

router.get('/:userId', getUser);               // Get user by ID
router.post('/', createUser);                 // Create user
router.put('/:userId', updateUserProgress);   // Update progress

module.exports = router;
