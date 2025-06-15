const express = require('express');
const { getTasks, addTask, completeTask, completeMicroTask } = require('../controllers/tasks');
const router = express.Router();

router.get('/:userId', getTasks);
router.post('/', addTask);
router.patch('/complete', completeTask); // POST /api/tasks/complete
router.patch('/completeMicroTask', completeMicroTask);

module.exports = router;
