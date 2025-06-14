const express = require('express');
const { getTasks, createTask, completeTask, completeMicroTask } = require('../controllers/tasks');
const router = express.Router();

router.get('/:userId', getTasks);
router.post('/', createTask);
router.post('/complete', completeTask); // POST /api/tasks/complete
router.post('/completeMicroTask', completeMicroTask);

module.exports = router;
