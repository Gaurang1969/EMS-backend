const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, getMyTasks, updateTaskStatus } = require('../controllers/taskController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, adminOnly, createTask);         // only admin
router.get('/', protect, adminOnly, getAllTasks);          // only admin
router.get('/me', protect, getMyTasks);                   // any employee
router.patch('/:id', protect, updateTaskStatus);          // any employee

module.exports = router;